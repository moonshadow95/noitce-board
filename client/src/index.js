import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TokenStorage from "./db/token.js";
import AuthService from "./service/auth.js";
import BoardService from "./service/board.js"
import './index.css'

const BASE_URL = 'http://localhost:8080'
const tokenStorage = new TokenStorage();
const authService = new AuthService(BASE_URL, tokenStorage);
const boardService = new BoardService(BASE_URL, tokenStorage)

ReactDOM.render(
    <React.StrictMode>
        <App authService={authService} boardService={boardService}/>
    </React.StrictMode>,
    document.getElementById('root')
);