
export async function checkAuth() {
    try {
        const response = await fetch(`/api/auth/check`, {
            method: "GET",
            credentials: "include"
        });

        return response.status === 200;
    } catch (error) {
        return false;
    }
}
