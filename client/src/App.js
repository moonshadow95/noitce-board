import Home from "./routes/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/read/:id" element={<h1>read</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
