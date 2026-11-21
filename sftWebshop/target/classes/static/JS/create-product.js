import { protectPage } from "/JS/authGuard.js";
import { logout } from "/JS/auth.js";

await protectPage();

const CREATE_PRODUCT_URL = "/api/product/save";

const formEl = document.getElementById("create-product-form");
const resetBtn = document.getElementById("create-reset-btn");
const submitBtn = document.getElementById("create-submit-btn");
const statusEl = document.getElementById("create-status");

const titleInput = document.getElementById("product-title");
const priceInput = document.getElementById("product-price");
const descriptionInput = document.getElementById("product-description");

const previewTitle = document.getElementById("preview-title");
const previewPrice = document.getElementById("preview-price");
const previewDescription = document.getElementById("preview-description");

function showStatus(message, type = "success") {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `profile-status profile-status--${type}`;
    statusEl.hidden = false;
}

function hideStatus() {
    if (!statusEl) return;
    statusEl.hidden = true;
    statusEl.textContent = "";
}

function formatPrice(rawValue) {
    const normalized = String(rawValue ?? "").replace(",", ".");
    const numeric = Number(normalized);
    if (!rawValue || Number.isNaN(numeric) || numeric < 0) {
        return "0,00 €";
    }
    return `${numeric.toFixed(2).replace(".", ",")} €`;
}

function updatePreview() {
    if (previewTitle) {
        const title = titleInput?.value.trim();
        previewTitle.textContent = title || "Titel deines Artikels";
    }
    if (previewPrice) {
        previewPrice.textContent = formatPrice(priceInput?.value);
    }
    if (previewDescription) {
        const desc = descriptionInput?.value.trim();
        previewDescription.textContent = desc || "Hier erscheint die Beschreibung deines Angebots.";
    }
}

[titleInput, priceInput, descriptionInput].forEach((input) => {
    input?.addEventListener("input", updatePreview);
});

resetBtn?.addEventListener("click", () => {
    hideStatus();
    setTimeout(updatePreview, 0);
});

formEl?.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideStatus();

    const title = titleInput?.value.trim() ?? "";
    const price = Number(String(priceInput?.value ?? "").replace(",", "."));
    const description = descriptionInput?.value.trim() ?? "";

    if (!title || !description || Number.isNaN(price) || price <= 0) {
        showStatus("Bitte fülle alle Felder gültig aus (Preis muss größer als 0 sein).", "error");
        return;
    }

    if (submitBtn) submitBtn.disabled = true;

    try {
        const response = await fetch(CREATE_PRODUCT_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                title,
                description,
                price
            })
        });

        if (response.status === 401 || response.status === 403) {
            throw new Error("Keine Berechtigung. Bitte erneut einloggen.");
        }

        if (response.status === 400) {
            throw new Error("Ungültige Produktdaten. Bitte Eingaben prüfen.");
        }

        if (!response.ok) {
            throw new Error(`Artikel konnte nicht erstellt werden (HTTP ${response.status}).`);
        }

        showStatus("Artikel wurde erfolgreich eingestellt!", "success");
        setTimeout(() => {
            window.location.href = "/profile.html";
        }, 700);
    } catch (error) {
        showStatus(error.message || "Fehler beim Erstellen des Artikels.", "error");
        if (submitBtn) submitBtn.disabled = false;
    }
});

updatePreview();