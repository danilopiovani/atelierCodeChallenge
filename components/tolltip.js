import React from 'react'
import style from '../pages/styles/filmDetail.module.scss'
const Tolltip = (props) => {
    return (
        <div className={style.tooltip}>
            <div># {props.name}</div>
            <span>Birth  Year</span>
                <p>{props.birth_year}</p>
            <span>Eye Color</span>
                <p>{props.eye_color}</p>
            <span>Gender</span>
                <p>{props.gender}</p>
            <span>Hair Color</span>
                <p>{props.hair_color}</p>
            <span>Skin Color</span>
                <p>{props.skin_color}</p>                    
        </div>
    )
}

export default Tolltip
