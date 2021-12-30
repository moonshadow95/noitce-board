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
import Gourmet from "./routes/Gourmet/Gourmet";
import Home from './routes/Home/Home'
import ReviewAll from "./components/Review/ReviewAll";
import ShopAll from "./components/Shop/ShopAll";

function App({authService, boardService} ) {
    const [user, setUser] = useState(undefined)
    const [banner, setBanner] = useState('')
    const [isAuth, setIsAuth] = useState(undefined)
    const [isAlert, setIsAlert] = useState()
    const [data, setData] = useState();

    const getUser = useCallback(async()=>{
        try {
            const user  = await authService.me()
            setUser(user.data)
        }
        catch(error){
            console.log(error.message)
        }
        return user
    },[user, authService])

    useEffect(()=>{
        getUser()
        setIsAuth(prev=>user)
    },[getUser, user])

    return (
        <BrowserRouter>
            {/* 로그인 상태시 내비게이션 바 표시 */}
            {user&& <Navigation authService={authService} user={user}/>}
            {/* 글로벌 스타일 */}
            <GlobalStyle />
            <Banner text={banner} isAlert={isAlert}/>
            <Routes>
                <Route path="/" element={
                    // 로그인 상태
                    user ? <Home /> :<>
                        {/* 로그인 */}
                        <div className={styles.header}>
                            <h1 className={styles.title}>ictus</h1>
                        </div>
                        <Auth setIsAuth={setIsAuth} authService={authService} setBanner={setBanner} setIsAlert={setIsAlert}/>
                    </>
                }/>
                {/* 간식 게시판 */}
                <Route path="/snack" element={
                    <Snack
                        user={user}
                        authService={authService}
                        boardService={boardService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                <Route path='/snack/:id' element={
                    <Read
                        authService={authService}
                        boardService={boardService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                {/* 맛집 게시판 */}
                <Route path='/gourmet' element={
                    <Gourmet
                        authService={authService}
                        boardService={boardService}
                    />}
                />
                <Route path='/gourmet/reviews' element={
                    <ReviewAll
                        user={user}
                        authService={authService}
                        boardService={boardService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}/>}
                />
                <Route path='/gourmet/reviews/:id' element={
                    <Read
                        authService={authService}
                        boardService={boardService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                <Route path='/gourmet/shops' element={
                    <ShopAll
                        // data={}
                    />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
