
import { checkAuth } from "/JS/checkAuth.js";

export async function protectPage() {
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        window.location.replace("/login.html");
    }
}
