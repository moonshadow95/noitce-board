import React, {useCallback, useEffect, useState} from 'react';
import BoardItem from "./BoardItem";
import TextEditor from "../TextEditor";
import Paging from "../Paging/Paging";
import {useLocation, useNavigate} from "react-router-dom";
import SearchPlace from "../Map/SearchPlace";
import LoadingSpinner from "../LoadingSpinner";

const Board = ({user, authService, boardService, setBanner, setIsAlert}) => {
    const [isAuth, setIsAuth] = useState(undefined)
    const [writing, setWriting] = useState(false)
    const [viewContent, setViewContent] = useState([])
    const [registeredShops, setRegisteredShops] = useState([])
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState('');
    const [placeObj, setPlaceObj] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation().pathname.includes('gourmet') ? '/gourmet' : '/snack'
    const isShops = location.includes('gourmet')
    const itemsPerPage = 8
    const onWriteClick = () => {
        setKeyword('')
        setWriting(prev => !prev)
    }
    const pagination = (array, page, itemsPerPage) =>
        array.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
    // 게시판 가져오기
    const getBoards = useCallback(async () => {
        const response = await boardService.getBoard(null, location)
        if (isShops) {
            const data = response.map(item => {
                const id = item.id
                const titles = item.title
                const coords = item.coords.split(',');
                return {id: id, title: titles, coords: coords.map(item => parseFloat(item))}
            })
            setRegisteredShops([...data])
        }
        setViewContent(prev => [...response])
        return setIsLoading(false)
    }, [boardService, isShops])
    useEffect(() => {
        getBoards()
        setIsAuth(prev => user)
    }, [getBoards, user,])

    // 로그인 확인
    useEffect(() => {
        authService.me().catch(err => navigate('/'))
    }, [authService, navigate])

    return (
        <main
            className={`flex-col-center mt-[100px] lg:mx-24 ${isShops && 'lg:flex-row gap-6'}`}
        >
            {isShops &&
            <SearchPlace
                boardService={boardService}
                getBoards={getBoards}
                keyword={keyword}
                setKeyword={setKeyword}
                setPlaceObj={setPlaceObj}
                registeredShops={registeredShops}
                setIsAlert={setIsAlert}
                setBanner={setBanner}
            />}
            {isLoading ? <LoadingSpinner/> :
                <section
                    className='flex-col-center items-center max-w-[700px] md:min-w-[500px] gap-8 basis-1/2 mx-auto'
                >
                    <header className='flex-col-center text-center'>
                        <h1 className='title'>{isShops ? '등록된 맛집' : '간식 신청 게시판'}</h1>
                        <span className='mt-4'>{isShops ? '키워드로 검색 후 결과 목록에서 클릭해주세요.' : '원하는 간식을 신청하세요.'}</span>
                    </header>
                    <>
                        {viewContent[0] ?
                            <ul
                                className='flex-col-center bg-white gap-4 w-[80vw] sm:w-auto'
                            >
                                {pagination(viewContent, page, itemsPerPage).map((content, index) =>
                                    <li key={index}
                                        className='flex w-full round shadow-lg item-animation'
                                    >
                                        <BoardItem content={content}/>
                                    </li>
                                )}
                            </ul> : <div
                                className='p-6 md:px-24 round shadow-lg'>{isShops ? '등록된 맛집이 없습니다.' : '신청 글이 없습니다.'}</div>}
                        {isShops || (writing ?
                                <TextEditor
                                    isEdit={false}
                                    onWriteClick={onWriteClick}
                                    boardService={boardService}
                                    getBoards={getBoards}
                                    user={user}
                                    setBanner={setBanner}
                                    setIsAlert={setIsAlert}
                                    keyword={keyword}
                                    setKeyword={setKeyword}
                                    placeObj={placeObj}
                                    setPlaceObj={setPlaceObj}
                                /> :
                                <div>
                                    <button onClick={onWriteClick}
                                            className={`button-common button-animation`}
                                    >글 작성하기
                                    </button>
                                </div>
                        )}
                        <Paging
                            page={page}
                            setPage={setPage}
                            totalCount={viewContent.length}
                            itemsPerPage={itemsPerPage}
                        />
                    </>
                </section>}
        </main>
    )
};

export default Board;