async function search() {
    const value = document.getElementById("search").value.trim();
    if (!value) return;

    try {
        const response = await fetch(`/api/product/product/${encodeURIComponent(value)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Produkte nicht gefunden");
        }

        const products = await response.json();
        console.log("Gefundene Produkte:", products);

        renderProducts(products);

    } catch (error) {
        console.error("Suchfehler:", error);
        const container = document.getElementById("searchResultsContainer");
        if (container) {
            container.innerHTML = `<p class="no-results">Keine Produkte gefunden oder ein Fehler ist aufgetreten.</p>`;
        }
    }
}


function renderProducts(products) {
    const container = document.getElementById("searchResultsContainer");
    if (!container) return;

    container.innerHTML = "";

    if (!products || products.length === 0) {
        container.innerHTML = `<p class="no-results">Zu Ihrer Anfrage wurde nichts gefunden.</p>`;
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price} €</span>
                    <span class="product-seller">Verkäufer: <b>${product.sellerUsername}</b></span>
                </div>
                <!-- Lösch-Button basierend auf Ihrer DELETE-Methode in der API -->
                <button class="btn-delete" onclick="deleteProduct(${product.productId})">Löschen</button>
            </div>
        `;
        container.appendChild(card);
    });
}

async function deleteProduct(id) {
    if (!confirm("Sind Sie sicher, dass Sie dieses Produkt löschen möchten?")) return;

    try {
        const response = await fetch(`/api/product/delete/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Produkt erfolgreich gelöscht!");
            search();
        } else if (response.status === 403) {
            alert("Sie haben keine Berechtigung, dieses Produkt zu löschen (FORBIDDEN)");
        } else {
            alert("Fehler beim Löschen des Produkts");
        }
    } catch (e) {
        console.error("Netzwerkfehler:", e);
    }
}