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

const fakeDB=[
    {
        id:1,
        title:'롯데리아',
        rate:5,
        coords:[33.450001,126.570467],
        text:'안고, 내는 못할 평화스러운 산야에 인도하겠다는 않는 황금시대다. 없는 작고 희망의 얼음 쓸쓸하랴? 때까지 인생의 청춘은 철환하였는가?',
        owner:'임철종',
        date: new Date()
    },
    {
        id:2,
        title:'맘스터치',
        rate:3,
        coords:[33.450001,126.575],
        text:'사람은 간에 넣는 사막이다. 유소년에게서 청춘의 인생을 목숨을 끓는다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:3,
        title:'롤로랄라',
        rate:4,
        coords:[33.448,126.57],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:4,
        title:'맥도날드',
        rate:4,
        coords:[33.450001,126.57048],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:5,
        title:'버거킹',
        rate:4,
        coords:[33.450001,126.57048],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:6,
        title:'한촌 설렁탕',
        rate:4,
        coords:[33.450001,126.57048],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    }
]

function App({authService} ) {
    const [user, setUser] = useState(undefined)
    const [banner, setBanner] = useState('')
    const [isAuth, setIsAuth] = useState(undefined)
    const [isAlert, setIsAlert] = useState()
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
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                <Route path="/snack/get/:id" element={
                    <Read
                        authService={authService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}
                    />}
                />
                {/* 맛집 게시판 */}
                <Route path='/gourmet' element={
                    <Gourmet data={fakeDB} authService={authService} />}
                />
                <Route path='/gourmet/reviews' element={
                    <ReviewAll
                        user={user}
                        authService={authService}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}/>}
                />
                <Route path='/gourmet/shops' element={
                    <ShopAll data={fakeDB}/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
