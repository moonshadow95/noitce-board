const TOKEN = 'token'

export default class TokenStorage {
    saveToken(token) {
        console.log(token)
        localStorage.setItem(TOKEN, token);
    }

    getToken() {
        return localStorage.getItem(TOKEN)
    }

    clearToken() {
        localStorage.clear()
    }
}