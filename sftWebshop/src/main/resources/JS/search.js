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
            throw new Error("Товары не найдены");
        }

        const products = await response.json();
        console.log("Найденные товары:", products);

        renderProducts(products);

    } catch (error) {
        console.error("Ошибка поиска:", error);
        const container = document.getElementById("searchResultsContainer");
        if (container) {
            container.innerHTML = `<p class="no-results">Товары не найдены или произошла ошибка.</p>`;
        }
    }
}

// Функция построения карточек товаров (Grid)
function renderProducts(products) {
    const container = document.getElementById("searchResultsContainer");
    if (!container) return;

    container.innerHTML = "";

    if (!products || products.length === 0) {
        container.innerHTML = `<p class="no-results">По вашему запросу ничего не найдено.</p>`;
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
                    <span class="product-seller">Продавец: <b>${product.sellerUsername}</b></span>
                </div>
                <!-- Кнопка удаления, опираясь на твой DELETE метод из API -->
                <button class="btn-delete" onclick="deleteProduct(${product.productId})">Удалить</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Функция удаления товара (согласно твоему API: DELETE /api/product/delete/{id})
async function deleteProduct(id) {
    if (!confirm("Вы уверены, что хотите удалить этот товар?")) return;

    try {
        const response = await fetch(`/api/product/delete/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Товар успешно удален!");
            search(); // Перезапускаем поиск, чтобы обновить список
        } else if (response.status === 403) {
            alert("У вас нет прав на удаление этого товара (FORBIDDEN)");
        } else {
            alert("Ошибка при удалении товара");
        }
    } catch (e) {
        console.error("Ошибка сети:", e);
    }
}