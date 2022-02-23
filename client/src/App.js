import React, {useCallback, useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Read from "./routes/Read";
import Banner from "./components/Banner";
import Navigation from "./components/Navigation";
import Gourmet from "./routes/Gourmet";
import Home from './routes/Home'
import ShopDetail from "./components/ShopDetail";
import Board from "./components/Board";

function App({authService, boardService}) {
    const [user, setUser] = useState(undefined)
    const [banner, setBanner] = useState('')
    const [isAlert, setIsAlert] = useState()

    const getUser = useCallback(async () => {
        try {
            const user = await authService.me()
            setUser(user.data)
        } catch (error) {
            setBanner('로그인 해주세요.')
        }
        return user
    }, [user, authService])

    useEffect(() => {
        getUser()
    }, [])

    return (
        <BrowserRouter>
            {/* 로그인 상태시 내비게이션 바 표시 */}
            {user && <Navigation authService={authService} user={user}/>}
            {/* 알림 배너 */}
            <Banner text={banner} isAlert={isAlert}/>
            {/* 라우트 */}
            <Routes>
                <Route path="/" element={
                    // 홈
                    <Home user={user} setUser={setUser} authService={authService}
                          setBanner={setBanner} setIsAlert={setIsAlert}
                    />
                }/>
                {/* 간식 신청 게시판 */}
                <Route path="/snack" element={
                    <Board
                        user={user}
                        authService={authService}
                        boardService={boardService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                {/* 신청 내용 보기 */}
                <Route path='/snack/:id' element={
                    <Read
                        user={user}
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
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                {/* 맛집 등록 지도 & 등록된 맛집들 */}
                <Route path='/gourmet/shops' element={
                    <Board
                        user={user}
                        authService={authService}
                        boardService={boardService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                {/* 등록된 가게 정보 & 리뷰들 */}
                <Route path='/gourmet/shops/:id' element={
                    <ShopDetail
                        user={user}
                        authService={authService}
                        boardService={boardService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
