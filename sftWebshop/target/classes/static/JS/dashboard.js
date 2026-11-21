const PRODUCT_API_BASE = "/api/product";

document.addEventListener("DOMContentLoaded", () => {
    loadAllProducts();
});

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

async function loadAllProducts() {
    const container = document.getElementById("dashboardProductsGrid");
    if (!container) return;

    container.innerHTML = `<p class="loading-text">Artikel werden geladen...</p>`;

    try {
        const response = await fetch(`${PRODUCT_API_BASE}/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`Fehler beim Laden der Artikel (HTTP ${response.status})`);
        }

        const products = await response.json();
        renderDashboardProducts(products);
    } catch (error) {
        console.error("Fehler beim Laden der Startseite:", error);
        container.innerHTML = `<p class="no-results">Derzeit sind keine Artikel verfügbar oder der Server ist не erreichbar.</p>`;
    }
}

function renderDashboardProducts(products, emptyMessage = "Die Artikelliste ist leer.") {
    const container = document.getElementById("dashboardProductsGrid");
    if (!container) return;

    container.innerHTML = "";

    if (!Array.isArray(products) || products.length === 0) {
        container.innerHTML = `<p class="no-results">${escapeHtml(emptyMessage)}</p>`;
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-info">
                <h3 class="product-title">${escapeHtml(product.title)}</h3>
                <p class="product-desc">${escapeHtml(product.description || "")}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <span class="product-seller">Verkäufer: <b>${escapeHtml(product.sellerUsername || "—")}</b></span>
                </div>

            </div>
        `;
        container.appendChild(card);
    });
}

window.loadAllProducts = loadAllProducts;
window.renderDashboardProducts = renderDashboardProducts;