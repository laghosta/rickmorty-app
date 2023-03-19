import React from 'react';
import styles from '../styles.module.scss'
import {ICharacter} from "../redux/types";
import {Link, useNavigate} from "react-router-dom";
const qs = require("qs")
interface Props{
    obj:ICharacter
}

const Character = ({obj}:Props) => {
    return (
        <Link to={`/${obj.id}`} className={styles.character}>
            <img src={obj.image} alt="character image"/>
            <div className={styles.character__info}>
                <h4>{obj.name}</h4>
                <span>{obj.species}</span>
            </div>
        </Link>
    );
};

export default Character;