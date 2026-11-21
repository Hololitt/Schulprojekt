import { protectPage } from "/JS/authGuard.js";
import { logout } from "/JS/auth.js";

await protectPage();

const MY_PRODUCTS_URL = "/api/product/my";

const subtitleEl = document.getElementById("profile-subtitle");
const statusEl = document.getElementById("profile-status");
const sellerEl = document.getElementById("info-seller");
const countEl = document.getElementById("info-count");
const gridEl = document.getElementById("my-products-grid");
const logoutBtn = document.getElementById("logout-btn");

function showStatus(message, type = "error") {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `profile-status profile-status--${type}`;
    statusEl.hidden = false;
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function formatPrice(price) {
    const numeric = Number(price);
    if (Number.isNaN(numeric)) return "—";
    return `${numeric.toFixed(2).replace(".", ",")} €`;
}

function renderProducts(products) {
    if (!gridEl) return;

    const list = Array.isArray(products) ? products : [];
    if (countEl) {
        countEl.textContent = String(list.length);
    }

    const sellerName = list[0]?.sellerUsername;
    if (sellerEl) {
        sellerEl.textContent = sellerName ? `@${sellerName}` : "Angemeldet";
    }
    if (subtitleEl && sellerName) {
        subtitleEl.textContent = `Eingeloggt als @${sellerName}`;
    }

    if (list.length === 0) {
        gridEl.innerHTML = `<p class="no-results">Du hast noch keine Artikel zum Verkauf eingestellt.</p>`;
        return;
    }

    gridEl.innerHTML = list.map((item) => `
        <article class="product-card" data-product-id="${escapeHtml(item.productId)}">
            <div>
                <div class="product-meta-row">
                    <h3 class="product-title">${escapeHtml(item.title)}</h3>
                    <span class="product-id">#${escapeHtml(item.productId)}</span>
                </div>
                <p class="product-desc">${escapeHtml(item.description || "Keine Beschreibung vorhanden.")}</p>
            </div>

            <div class="product-footer">
                <span class="product-price">${formatPrice(item.price)}</span>
                <span class="product-seller">Verkäufer: ${escapeHtml(item.sellerUsername || "—")}</span>
            </div>
        </article>
    `).join("");
}

async function loadMyProducts() {
    try {
        const response = await fetch(MY_PRODUCTS_URL, {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Laden der Artikel (HTTP ${response.status}).`);
        }

        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        if (gridEl) {
            gridEl.innerHTML = `<p class="no-results">Artikel konnten nicht geladen werden.</p>`;
        }
        showStatus(error.message || "Beim Laden deiner Artikel ist ein Fehler aufgetreten.", "error");
        console.error(error);
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await logout();
            window.location.href = "/login.html";
        } catch (error) {
            showStatus(error.message || "Abmeldung fehlgeschlagen.", "error");
        }
    });
}

loadMyProducts();