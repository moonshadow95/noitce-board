import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TokenStorage from "./db/token.js";
import AuthService from "./service/auth.js";

const BASE_URL = 'http://localhost:8080'
const tokenStorage = new TokenStorage();
const authService = new AuthService(BASE_URL,tokenStorage);

ReactDOM.render(
    <React.StrictMode>
        <App authService={authService}/>
    </React.StrictMode>,
    document.getElementById('root')
);