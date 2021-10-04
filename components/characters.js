import Tolltip from "./tolltip"
/* Style */
import style from '../pages/styles/filmDetail.module.scss'
const characters = (props) => {
    return (
        <div className={style.peopleChild}>
            {props.list.map((val,key) => (
                <div className={style.personDetail} key={key}>
                    <span className={style.imagePerson}><img width="20" height="20" src="/assets/person.png" /></span>{val.name}
                    <Tolltip name={val.name} birth_year={val.birth_year} eye_color={val.eye_color} gender={val.gender}  hair_color={val.hair_color} skin_color={val.skin_color} />
                </div>
            ))}
        </div>
    )
}

export default characters
