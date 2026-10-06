const form = document.getElementById("registerForm");

form.addEventListener("submit", async function(event) {
    // Prevent the browser from submitting/reloading the page
    event.preventDefault();

    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                username: username,
                name: name,
                surname: surname,
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