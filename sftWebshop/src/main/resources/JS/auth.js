const API_BASE_URL = "/api/auth";

/**
 * Registrierung
 *
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @param {string} name
 * @param {string} surname
 * @returns {Promise<boolean>}
 */
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


/**
 * Login
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<boolean>}
 */
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


/**
 * Logout
 *
 * @returns {Promise<boolean>}
 */
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
