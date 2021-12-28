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
        name:'롯데리아',
        rate:5,
        coords:[33.450001,126.570467],
        text:'안고, 내는 못할 평화스러운 산야에 인도하겠다는 않는 황금시대다. 없는 작고 희망의 얼음 쓸쓸하랴? 때까지 인생의 청춘은 철환하였는가?',
        owner:'임철종',
        date: new Date()
    },
    {
        id:2,
        name:'맘스터치',
        rate:3,
        coords:[33.450001,126.575],
        text:'사람은 간에 넣는 사막이다. 유소년에게서 청춘의 인생을 목숨을 끓는다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:3,
        name:'롤로랄라',
        rate:4,
        coords:[33.448,126.57],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:4,
        name:'맥도날드',
        rate:4,
        coords:[33.450001,126.57048],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:5,
        name:'버거킹',
        rate:4,
        coords:[33.450001,126.57048],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    },
    {
        id:6,
        name:'한촌 설렁탕',
        rate:4,
        coords:[33.450001,126.57048],
        text:'넣는 산야에 수 황금시대다. 가진 미인을 귀는 품에 트고, 가장 이 간에 꽃이 아름다우냐? 스며들어 바로 우리 것이다. 실현에 과실이 무엇을 봄바람이다.',
        owner:'임철종',
        date: new Date()
    }
]

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
                    user ? <Home /> :<>
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
                    <Gourmet data={fakeDB} authService={authService} />
                } />
                <Route path='/gourmet/reviews' element={
                    <ReviewAll
                        user={user}
                        authService={authService}
                        boardContent={fakeDB}
                        setBanner={setBanner}
                        setIsAlert={setIsAlert}/>
                }/>
                <Route path='/gourmet/shops' element={
                    <ShopAll data={fakeDB}/>
                }/>
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
