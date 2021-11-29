import Home from "./routes/Home/Home";
import Read from "./routes/Read/Read";
import GlobalStyle from './components/GlobalStyles/GlobalStyles.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import Banner from "./components/Banner/Banner";

function App({authService} ) {
    const [boardContent,setBoardContent] = useState([])
    const [user, setUser] = useState(undefined)
    const [banner, setBanner] = useState('')
    const [isAlert, setIsAlert] = useState()
    useEffect(()=>{
        Axios.get('http://localhost:8080/boards/get').then((response)=>
            setBoardContent(response.data)
        )
    },[])
    const getUser = useCallback(async()=>{
        try {const user  = await authService.me()
            setUser(user.data)
        }
        catch(error){
        }
        return user
    },[user, authService])
    useEffect(()=>{
        getUser()
    },[getUser])
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Banner text={banner} isAlert={isAlert}/>
            <Routes>
                <Route path="/" element={<Home
                    user={user}
                    authService={authService}
                    boardContent={boardContent}
                    setBanner={setBanner}
                    setIsAlert={setIsAlert}
                />} />
                <Route path="/boards/get/:id" element={<Read
                    authService={authService}
                    setBanner={setBanner}
                    setIsAlert={setIsAlert}
                />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
