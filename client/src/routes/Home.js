import React, {useEffect, useState} from 'react';
import Board from "../components/Board";
import Axios from "axios";
import TextEditor from "../components/TextEditor";

const Home = (props) => {
    const [writing, setWriting] = useState(false);
    const [viewContent,setViewContent] = useState([])
    const onWriteClick = () => {
        setWriting(prev=>!prev)
    }

    useEffect(()=>{
        Axios.get('http://localhost:8080/api/get').then((response)=>
            setViewContent(response.data)
        )
    },[viewContent])

    return(
        <main>
            <section style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',}}>
                <header>
                    <h1>React Notice Board</h1>
                </header>
                { writing && <TextEditor isEdit={false} /> }
                <div>
                    <button onClick={onWriteClick}>{writing ? "작성 취소" : "글 작성하기"}</button>
                </div>
                <table>
                    <tbody>
                    {viewContent.map((content,index) =>
                        <tr key={index} >
                            <Board content={content} />
                        </tr>
                    )}
                    </tbody>
                </table>
            </section>
        </main>
    );
}
export default Home;