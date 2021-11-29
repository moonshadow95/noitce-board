import Home from "./routes/Home/Home";
import Read from "./routes/Read/Read";
import GlobalStyle from './components/GlobalStyles/GlobalStyles.js';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import Banner from "./components/Banner/Banner";

function App({authService} ) {
    const [user, setUser] = useState(undefined)
    const [banner, setBanner] = useState('')
    const [isAlert, setIsAlert] = useState()

    const getUser = useCallback(async()=>{
        try {
            const user  = await authService.me()
            setUser(prev=>user.data)
        }
        catch(error){
        }
        return user
    },[user, authService])
    useEffect(()=>{
        getUser()
    },[])
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Banner text={banner} isAlert={isAlert}/>
            <Routes>
                <Route path="/" element={<Home
                    user={user}
                    authService={authService}
                    // boardContent={boardContent}
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
