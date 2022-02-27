import Axios from "axios";

export default class BoardService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getReviews(id) {
        const {data} = await Axios({
            method: 'GET',
            url: `${this.http}/gourmet/reviews/get/${id || ''}`,
            headers: this.getHeaders(),
        })
        return data
    }

    async getBoard(id, location) {
        const param = id ? id : '';
        const {data} = await Axios({
            method: 'GET',
            url: `${this.http}${location}/get/${param}`,
            headers: this.getHeaders(),
        })
        return data
    }

    async postBoard(dataObj, id, location) {
        const {data} = await Axios({
            method: 'POST',
            url: `${this.http}${location}/insert/${id}`,
            data: dataObj,
            headers: this.getHeaders(),
        })
        return data
    }

    async deleteBoard(id,location) {
        const {data} = await Axios({
            method: 'DELETE',
            url: `${this.http}${location}/delete/${id}`,
            headers: this.getHeaders(),
        })
        return data
    }

    async updateBoard(id, dataObj,location) {
        const {data} = await Axios({
            method: 'PUT',
            url: `${this.http}${location}/edit/${id}`,
            data: dataObj,
            headers: this.getHeaders(),
        })
        return data
    }

    // async addLike(id) {
    //     const {data} = await Axios({
    //         method: 'POST',
    //         url: `${this.http}/snack/${id}/like`,
    //         headers: this.getHeaders()
    //     })
    //     return data
    // }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        }
    }
}