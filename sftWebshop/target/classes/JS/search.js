async function search() {
    const value = document.getElementById("search").value;

    const response = await fetch("/product/${encodeURIComponent(value)}", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const result = await response.json();
    console.log(result);
}