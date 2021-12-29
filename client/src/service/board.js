import Axios from "axios";

export default class BoardService {
    constructor(http, tokenStorage) {
        this.http = http;
        this.tokenStorage = tokenStorage;
    }

    async getBoard(id) {
        // const query = id ? `?id=${id}` : '';
        const {data} = await Axios({
            method: 'GET',
            url:`${this.http+window.location.href.includes('snack')?'snack':'review'}/get`,
            headers: this.getHeaders(),
        });
        return data
    }

    async postBoard(text) {
        return this.http.fetch(`/board`, {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ text, username: 'ellie', name: 'Ellie' }),
        });
    }

    async deleteBoard(tweetId) {
        return this.http.fetch(`/board/${tweetId}`, {
            method: 'DELETE',
            headers: this.getHeaders(),
        });
    }

    async updateBoard(tweetId, text) {
        return this.http.fetch(`/board/${tweetId}`, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({ text }),
        });
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }
}