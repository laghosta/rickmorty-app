import React from 'react';
import {Link, useParams} from "react-router-dom";
import styles from '../styles.module.scss'
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getOneCharacter} from "../redux/charactersSlice";
import Skeleton from "../components/Skeleton";
import NotFound from "../components/NotFound";
const CharacterPage = () => {
    const character = useAppSelector(state=> state.characters.data)
    const status = useAppSelector(state=> state.characters.status)
    const dispatch = useAppDispatch()
    const { id } = useParams();

    React.useEffect(()=>{
        dispatch(getOneCharacter({id:Number(id)}))
    }, [])

    return (
        <div className={styles.character__page}>
            <Link className={styles.backBtn} to={"/"}>
                <img src="/img/back-arrow.png" alt="back button image"/>
                <span>GO BACK</span>
            </Link>
            <div className={styles.container}>
                {
                    status !== 'loading' ?
                        character!==null?
                           <div className={styles.character__block}>
                               <img src={character[0].image} alt="character image"/>
                               <h1>{character[0].name}</h1>
                               <div className={styles.character__descr}>
                                   <h2>Information</h2>
                                   <ul>
                                       <li>
                                           <h4>Gender</h4>
                                           <span>{character[0].gender}</span>
                                       </li>
                                       <li>
                                           <h4>Status</h4>
                                           <span>{character[0].status}</span>
                                       </li>
                                       <li>
                                           <h4>Specie</h4>
                                           <span>{character[0].species}</span>
                                       </li>
                                       <li>
                                           <h4>Origin</h4>
                                           <span>{character[0].origin.name}</span>
                                       </li>
                                       <li>
                                           <h4>Type</h4>
                                           <span>{character[0].type.length ? character[0].type : "unknown"}</span>
                                       </li>
                                   </ul>
                               </div>
                           </div>
                        :
                        <NotFound/>
                    :<Skeleton/>
                }
            </div>
        </div>
    );
};
export default CharacterPage;