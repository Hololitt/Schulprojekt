const API_BASE_URL = "/api/auth";


const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await login(email, password);
            window.location.href = "/";
        } catch (error) {
            alert(error.message);
        }
    });
}


const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const submitButton = registerForm.querySelector('input[type="submit"], button[type="submit"]');
        if (submitButton) submitButton.disabled = true;

        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const password = document.getElementById("password").value;

        try {
            await register(email, password, username, name, surname);
            alert("Registrierung erfolgreich! Bitte einloggen.");
            window.location.href = "/login.html";
        } catch (error) {
            alert(error.message);
            if (submitButton) submitButton.disabled = false;
        }
    });
}


export async function register(email, password, username, name, surname) {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            password,
            username,
            name,
            surname
        })
    });

    if (response.status === 200) {
        return true;
    }

    if (response.status === 409) {
        throw new Error("Diese E-Mail-Adresse ist bereits registriert.");
    }

    if (response.status === 400) {
        throw new Error("Ungültige Eingabedaten.");
    }

    throw new Error("Registrierung fehlgeschlagen.");
}



export async function login(email, password) {
    const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            email,
            password
        })
    });

    if (response.status === 200) {
        return true;
    }

    if (response.status === 400) {
        throw new Error("Ungültige Eingabedaten.");
    }

    if (response.status === 401) {
        throw new Error("E-Mail oder Passwort ist falsch.");
    }

    throw new Error("Login fehlgeschlagen.");
}



export async function logout() {
    const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include"
    });

    if (response.status === 200) {
        return true;
    }

    throw new Error("Logout fehlgeschlagen.");
}
