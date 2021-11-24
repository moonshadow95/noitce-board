import Axios from 'axios';
export default class AuthService {
    constructor(http, tokenStorage){
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async signup(username, password){
        const data = await this.http.fetch('/auth/signup',{
            method:"POST",
            body: JSON.stringify({
                username,
                password,
            })
        })
        this.tokenStorage.saveToken(data.token)
        return data
    }

    async login(username, password){
        const data = await this.http.fetch('/auth/login',{
            method:"POST",
            body: JSON.stringify({username, password})
        })
        this.tokenStorage.saveToken(data.token)
        return data
    }

    async me() {
        const token = this.tokenStorage.getToken();
        return Axios({
            method:"POST",
            url:this.http+'/auth/me',
            headers: {Authorization: `Bearer ${token}`}
        })
    }

    async logout() {
        this.tokenStorage.clearToken();
    }
}