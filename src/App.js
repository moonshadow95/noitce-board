import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState} from "react";
import ReactHtmlParser from 'html-react-parser';

function App() {
    const [content, setContent] = useState({
        title:'',
        text:''
    })
    const [viewContent, setViewContent] = useState([])

    const onChange = event => {
        const {name, value} = event.target
        setContent({...content, [name]:value})
    }
    const onClick = () => {
        setViewContent(
            viewContent.concat({...content})
        )
    }

    return (
        <main>
            <section>
                <header>
                    <h1>React Notice Board</h1>
                </header>
                <aside style={{width:'100%'}}>
                    {viewContent.map(element =>
                        <div>
                            <h2>{element.title}</h2>
                            <p>{ReactHtmlParser(element.text)}</p>
                        </div>
                    )}
                </aside>
                <aside style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <div>
                        <h3>제목</h3>
                        <div>
                            <span>내용</span>
                        </div>
                    </div>
                    <div style={{color:'#000'}}>
                        <input type="text" placeholder='제목을 입력하세요.' name='title' onChange={onChange}/>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent({...content, text:data})
                            }}
                        />
                    </div>
                    <button onClick={onClick}>완료</button>
                </aside>
            </section>
        </main>
    );
}

export default App;
