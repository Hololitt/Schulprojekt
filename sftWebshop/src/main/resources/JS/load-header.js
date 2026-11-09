document.addEventListener("DOMContentLoaded", () => {
    const headerHTML = `
    <header class="main-header">
        <div class="header-container">
            <a href="/dashboard.html" class="logo">SFT-Ebay</a>
            <div class="search-bar-container">
                <form id="searchForm" onsubmit="event.preventDefault(); search();">
                    <input type="text" id="search" placeholder="Suchen" autocomplete="off">
                    <button type="submit" id="submit">Suchen</button>
                </form>
            </div>
            <div class="header-actions">
                <a href="/create-product.html" class="btn-sell">verkaufen</a>
                <a href="/profile.html" class="btn-konto">Konto</a>
            </div>
        </div>
    </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);
});