//next and React
import { useEffect, useState } from "react";

//components
import Header from "../components/header";
import FilmMainInfo from "../components/filmMainInfo";
import Search from "../components/search";

//Style
import style from './styles/index.module.scss';

const Index = ({results}) => {
    //states
    const [searchTerm, setSearchTerm] = useState("");
    const [listFilm, setListFilm] = useState(results.results);
    const [listFilmFavorites, setListFilmFavorites] = useState([]);
    const [listFilmOthers, setListFilmOthers] = useState([]);
    const [favoriteFilms, setFavoriteFilms] = useState([]);

    //Search
    const searchFilm = () => {
        if(searchTerm !== ""){
            let listFilmLocal = [];
            for(let i=0; i<results.results.length; i++){
                if(results.results[i].title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
                    listFilmLocal = [...listFilmLocal, results.results[i]];
                }
            }        
            setListFilm(listFilmLocal)
        }else{
            setListFilm(results.results)
        }
        
    }

    // favorite
    const favoriteFilm = (film) => {
        let favorite = [...favoriteFilms]
        if(favorite.indexOf(film) >= 0){
            // delete favorite from list
            let favSplice = favorite.splice(favorite.indexOf(film),1);
            setFavoriteFilms(favoriteFilms => favorite);
        } else {
            // insert favorite to list
            setFavoriteFilms(favoriteFilms => [...favoriteFilms, film]);
        }
    }

    // group favorite and non favorites in diferents list
    const setListWithFavorite = () => {
        let favoriteList = [] , list = [];
        for(let x=0; x<listFilm.length; x++) {
            if(favoriteFilms.indexOf(listFilm[x].episode_id) >= 0){
                // favorites
                favoriteList = [...favoriteList, listFilm[x]];
                
            } else {
                // noum favorites
                list = [...list, listFilm[x]];
            }
        }
        setListFilmFavorites(listFilmFavorites => favoriteList);
        setListFilmOthers(listFilmOthers => list);
    }

    // check the favorites from local storage
    useEffect(() => {
        const data = localStorage.getItem('favorite-films');
        if(data !== null){
            setFavoriteFilms(JSON.parse(data));
        }              
    }, [])

    // save to local storage 
    useEffect(() => {
        localStorage.setItem("favorite-films", JSON.stringify(favoriteFilms))            
        setListWithFavorite();
    }, [favoriteFilms]);
    
    //when the list film is set there are separated favorites and non favorites
    useEffect(() => {
        setListWithFavorite();
    },[listFilm])

    // function to return the index from the API return
    const getID = (ep_id) => {
        let myIndex;
        for(let i=0; i<results.results.length; i++){
            if(results.results[i].episode_id === ep_id){
                myIndex = i+1;
            }
        }
        return myIndex
    }

    return (
        <div className={style.container}>
            <Header />
            <Search searchTerm={setSearchTerm} searchFilm={searchFilm}/>
            
            <div className={style.content}>
                {results && listFilmFavorites.map((film,key) => (
                <>
                    <FilmMainInfo  
                            episode_id={film.episode_id} 
                            isFavorite = "true"
                            favoriteFilm={favoriteFilm} 
                            opening_crawl={film.opening_crawl} 
                            title={film.title}
                            director={film.director} 
                            producer={film.producer}
                            release_date={film.release_date}
                            buttomId={getID(film.episode_id)}
                            /> 
                    <div className={style.spacer}>
                    </div>
                </>
                    
                ))}

                {results && listFilmOthers.map((film,key) => (
                <>
                    <FilmMainInfo  
                        episode_id={film.episode_id} 
                        isFavorite = "false"
                        favoriteFilm={favoriteFilm} 
                        opening_crawl={film.opening_crawl} 
                        title={film.title}
                        director={film.director} 
                        producer={film.producer}
                        release_date={film.release_date}
                        buttomId={getID(film.episode_id)}
                        />
                    <div className={style.spacer}>
                    </div>
                </>
                    
                ))}
            </div>
        </div>
    )
}

export default Index

export async function getStaticProps() {
    const res = await fetch("https://swapi.dev/api/films");
    const data = await res.json();
    return{
        props:{
            results:data
        }
    }
}
