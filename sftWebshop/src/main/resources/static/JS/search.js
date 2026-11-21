const SEARCH_API_BASE = "/api/product";

function findSearchInput(form) {
    if (form instanceof HTMLFormElement) {
        return (
            form.querySelector("#dashboardSearchInput") ||
            form.querySelector('input[type="search"], input[name="title"], input')
        );
    }
    return (
        document.getElementById("dashboardSearchInput") ||
        document.querySelector("header form input, form[role='search'] input, input[type='search'], input[name='title']")
    );
}

async function runSearch(rawQuery) {
    const query = String(rawQuery ?? "").trim();
    const grid = document.getElementById("dashboardProductsGrid");

    if (!query) {
        if (typeof window.loadAllProducts === "function") {
            await window.loadAllProducts();
        }
        return;
    }

    if (grid) {
        grid.innerHTML = `<p class="loading-text">Suche nach „${query}“...</p>`;
    }

    try {
        const response = await fetch(`${SEARCH_API_BASE}/${encodeURIComponent(query)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const products = await response.json();
        if (typeof window.renderDashboardProducts === "function") {
            window.renderDashboardProducts(
                products,
                `Keine Artikel für „${query}“ gefunden.`
            );
        }
    } catch (error) {
        console.error("Fehler bei der Produktsuche:", error);
        if (grid) {
            grid.innerHTML = `<p class="no-results">Fehler bei der Suche.</p>`;
        }
    }
}

window.search = function (eventOrValue) {
    if (eventOrValue && typeof eventOrValue.preventDefault === "function") {
        eventOrValue.preventDefault();
        const input = findSearchInput(eventOrValue.target);
        runSearch(input ? input.value : "");
        return false;
    }

    const input = findSearchInput(null);
    runSearch(typeof eventOrValue === "string" ? eventOrValue : input?.value);
    return false;
};

document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    const hasInlineSearch = String(form.getAttribute("onsubmit") || "").includes("search");
    const isSearch =
        hasInlineSearch ||
        form.id === "dashboardSearchForm" ||
        form.getAttribute("role") === "search" ||
        Boolean(form.closest("header"));

    if (!isSearch) return;

    event.preventDefault();
    const input = findSearchInput(form);
    runSearch(input ? input.value : "");
}, true);

document.addEventListener("click", (event) => {
    const resetBtn = event.target.closest?.("#resetSearchBtn");
    if (!resetBtn) return;

    const input = findSearchInput(null);
    if (input) {
        input.value = "";
    }
    if (typeof window.loadAllProducts === "function") {
        window.loadAllProducts();
    }
});