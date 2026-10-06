const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(event) {
    // Prevent the browser from submitting/reloading the page
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        console.log("Registration successful:", data);

    } catch (error) {
        console.error("Registration failed:", error);
    }
});