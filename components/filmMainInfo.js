/* next */
import Image from 'next/image'
import Link from 'next/link'

/* Style */
import style from '../pages/styles/filmDetail.module.scss'
const filmMainInfo = (props) => {
    return (
        <div className={style.filmeDetail}>
            <div className={style.image}>
                <Image width="300" height="400" src={`/assets/episode_${props.episode_id}.jpg`} alt={`episode_${props.episode_id}`} />
            </div>
            <div className={style.description}>
                <h2>{props.title} 
                        <span className={props.isFavorite === "true" ? style.ratingOn : style.rating}>
                            <span onClick={() => props.favoriteFilm(props.episode_id)}>❤</span>
                        </span>
                </h2>
                    
                <h5>{props.opening_crawl}</h5>
                <h5><span>Director: </span>{props.director}</h5>
                <h5><span>Producer: </span>{props.producer}</h5>
                <h5><span>Release Date: </span>{props.release_date}</h5>
                {
                props.buttomId !== "" ? 
                    <div className={style.buttom}>
                        <Link href={`/film/${props.buttomId}`}>
                            <a>Learn More</a>
                        </Link>
                    </div>
                
                :
                    ""            
                }
            </div>                        
        </div> 
    )
}

export default filmMainInfo
