import Snack from "./routes/Snack/Snack";
import Read from "./routes/Read/Read";
import GlobalStyle from './util/GlobalStyles.js';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import Axios from "axios";
import Banner from "./components/Banner/Banner";
import Navigation from "./components/Navigation/Navigation";
import styles from "./routes/Snack/snack.module.css";
import Auth from "./components/Auth/Auth";
import SearchPlace from "./components/Map/SearchPlace";
import Gourmet from "./routes/Gourmet/Gourmet";

function App({authService} ) {
    const [boardContent,setBoardContent] = useState([])
    const [user, setUser] = useState(undefined)
    const [banner, setBanner] = useState('')
    const [isAuth, setIsAuth] = useState(undefined)
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
        setIsAuth(prev=>user)
    },[])
    return (
        <BrowserRouter>
            {user&& <Navigation authService={authService} user={user}/>}
            <GlobalStyle />
            <Banner text={banner} isAlert={isAlert}/>
            <Routes>
                <Route path="/" element={
                    user ? <>
                        <Link to='/boards'>간식게시판</Link>
                        <Link to='/gourmet'>맛집지도</Link>
                    </> :<>
                        <div className={styles.header}>
                            <h1 className={styles.title}>ictus</h1>
                        </div>
                        <Auth setIsAuth={setIsAuth} authService={authService} setBanner={setBanner} setIsAlert={setIsAlert}/>
                    </>
                }/>
                <Route path="/boards" element={
                    <Snack
                        user={user}
                        authService={authService}
                        boardContent={boardContent}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                />} />
                <Route path='/gourmet' element={
                    <Gourmet authService={authService} />
                } />
                <Route path="/boards/get/:id" element={
                    <Read
                        authService={authService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
