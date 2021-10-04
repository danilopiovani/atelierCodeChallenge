/* Style */
import style from '../pages/styles/index.module.scss';
const search = (props) => {
    return (
        <div className={style.search}>
            <input type="text" placeholder="Enter a film title to search." onChange={(event) => {props.setSearchTerm(event.target.value)}}></input>
            <input type="submit" onClick={() => props.searchFilm()} value="Search"></input>
        </div>
    )
}

export default search













