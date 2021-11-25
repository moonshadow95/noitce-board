import Home from "./routes/Home/Home";
import Read from "./routes/Read/Read";
import GlobalStyle from './components/GlobalStyles/GlobalStyles.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Axios from "axios";

function App({authService} ) {
    const [boardContent,setBoardContent] = useState([])
    const [user, setUser] = useState(undefined)
    useEffect(()=>{
        Axios.get('http://localhost:8080/boards/get').then((response)=>
            setBoardContent(response.data)
        )
    },[])
    useEffect(()=>{
        authService.me()
            .then(result=>setUser(result.data))
            .catch(console.error);
    },[authService])
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Routes>
                <Route path="/" element={<Home user={user} authService={authService} boardContent={boardContent}/>} />
                <Route path="/boards/get/:id" element={<Read authService={authService}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
