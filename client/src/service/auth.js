import Axios from 'axios';
export default class AuthService {
    constructor(http, tokenStorage){
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async signup(username, password){
        await Axios({
            method:"POST",
            url:this.http+'/auth/signup',
            data:{
                'username':username,
                'password':password,
            },
        })
    }

    async login(username, password){
        const {data} = await Axios({
            method:"POST",
            url:this.http+'/auth/login',
            data:{
                'username':username,
                'password':password,
            },
            headers:this.getHeaders()
        })
        this.tokenStorage.saveToken(data.token)
        window.location.reload();
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

    async getHeaders() {
        const token = localStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`
        }
    }
}