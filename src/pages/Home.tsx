import React from 'react';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getAllCharacters, getCharactersByName, setCurrentPage, setSearchValue} from "../redux/charactersSlice";
import styles from '../styles.module.scss'
import Character from "../components/Character";
import Skeleton from "../components/Skeleton";
import {useNavigate, useSearchParams} from "react-router-dom";
import NotFound from "../components/NotFound";
import {ICharacter} from "../redux/types";
const qs = require("qs")
function Home() {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const characters = useAppSelector(state=> state.characters.data)
    const status = useAppSelector(state=> state.characters.status)
    const currentPage = useAppSelector(state=> state.characters.currentPage)
    const searchValue = useAppSelector(state=> state.characters.searchValue)
    const [params, setSearchParams] = useSearchParams()
    let searchParams = params.get("search");
    React.useEffect(()=>{
        if(searchValue.trim().length){
            dispatch(getCharactersByName({page:currentPage, name:searchValue}))
        }
        else if(searchParams!==null && searchParams!.length){
            dispatch(setSearchValue(searchParams))
            dispatch(getCharactersByName({page:currentPage, name:searchParams!}))
        }
        else{
            dispatch(setSearchValue(""))
            dispatch(getAllCharacters({page:currentPage}))
        }

    }, [currentPage])

    React.useEffect(()=>{
        if(searchValue.trim().length){
            const queryString = qs.stringify({
                search:searchValue
            })
            nav(`?${queryString}`)
        }
        else{
            nav(`/`)
        }
    }, [searchValue])

    const onSearch = (event:any) => {
        event.preventDefault()
        dispatch(setCurrentPage(1))
        if(!searchValue.trim().length){
            dispatch(getAllCharacters({page:1}))
        }
        else dispatch(getCharactersByName({page:1, name:searchValue}))
    }
    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <img className={styles.logo} src="/img/logo.png" alt=""/>
                <form className={styles.search}>
                    <button onClick={(e)=>onSearch(e)} type="submit">
                        <img src="/img/search.png" alt=""/>
                    </button>
                    <input placeholder={"Filter by name..."} onChange={(e)=>dispatch(setSearchValue(e.target.value))} value={searchValue} type="text"/>
                </form>
                <div className={styles.content}>
                    {
                        status !== "loading" ?
                            (characters ?
                                characters.map((el:ICharacter)=>
                                    <Character key={el.id} obj={el}/>
                                )
                                :
                                <NotFound/>)
                            :
                            [...Array(20)].map((el, id) =>
                                <Skeleton key={id}/>
                            )
                    }
                </div>
                <div className={styles.pagination}>
                    <button disabled={characters === null || currentPage === 1} onClick={()=>dispatch(setCurrentPage(currentPage-1))}>
                        BACK
                    </button>
                    <button disabled={characters === null || characters.length < 20} onClick={()=>dispatch(setCurrentPage(currentPage+1))
                    }>
                        FORWARD
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
