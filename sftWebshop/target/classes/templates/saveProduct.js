const form = document.getElementById("productForm");

form.addEventListener("submit", async function(event) {
    // Prevent the browser from submitting/reloading the page
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const owner = document.getElementById("owner").value;

    try {
        const response = await fetch("api/product/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: description,
                price: price,
                owner: owner,
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Saving successful:", data);

    } catch (error) {
        console.error("Saving failed:", error);
    }
});