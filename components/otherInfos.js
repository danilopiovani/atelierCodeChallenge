/* Style */
import style from '../pages/styles/filmDetail.module.scss'
const otherInfos = (props) => {
    return (
        <div className={style.peopleChild}>
            <div className={style.personDetailTop}>{props.title}</div>
            {props.list.map((val,key) => (
                <div className={style.personDetail} key={key}>
                    {val.name}
                </div>
            ))}
        </div>
    )
}

export default otherInfos
