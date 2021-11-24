import Home from "./routes/Home/Home";
import Read from "./routes/Read/Read";
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
            <Routes>
                <Route path="/" element={<Home user={user} authService={authService} boardContent={boardContent}/>} />
                <Route path="/read/:id" element={<Read user={user} viewContent={boardContent}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
