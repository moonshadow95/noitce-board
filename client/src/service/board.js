import Axios from "axios";

export default class BoardService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getReviews(id) {
        const {data} = await Axios({
            method: 'GET',
            url:`${this.http}/gourmet/reviews/get/${id || ''}`,
            headers: this.getHeaders(),
        })
        return data
    }

    async getBoard(id) {
        const param = id ? id : '';
        const {data} = await Axios({
            method: 'GET',
            url:`${this.http}/${window.location.href.includes('snack')?'snack':'gourmet'}/get/${param}`,
            headers: this.getHeaders(),
        })
        return data
    }

    async postBoard(dataObj,id) {
        const {data} = await Axios({
            method: 'POST',
            url:`${this.http}/${window.location.href.includes('snack') ? 'snack' : 'gourmet'}/insert/${id}`,
            data: dataObj,
            headers: this.getHeaders(),
        })
        return data
    }

    async deleteBoard(id) {
        const {data} = await Axios({
            method: 'DELETE',
            url: `${this.http}/${window.location.href.includes('snack')?'snack':'gourmet'}/delete/${id}`,
            headers: this.getHeaders(),
        })
        return data
    }

    async updateBoard(id, dataObj) {
        const {data} = await Axios({
            method: 'PUT',
            url:`${this.http}/${window.location.href.includes('snack') ? 'snack' : 'gourmet'}/edit/${id}`,
            data: dataObj,
            headers: this.getHeaders(),
        })
        return data
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        }
    }
}