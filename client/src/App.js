import Home from "./routes/Home/Home";
import Read from "./routes/Read/Read";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useEffect, useState} from "react";
import Axios from "axios";

function App() {
    const [boardContent,setBoardContent] = useState([])
    useEffect(()=>{
        Axios.get('http://localhost:8080/api/get').then((response)=>
            setBoardContent(response.data)
        )
    },[boardContent])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home  viewContent={boardContent}/>} />
                <Route path="/read/:id" element={<Read viewContent={boardContent}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
