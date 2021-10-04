
//next + react
import { useContext, useEffect, useState } from "react";

/* Components */
import Header from "../../components/header"
import FilmMainInfo from "../../components/filmMainInfo"
import Characters from "../../components/characters"
import OtherInfos from "../../components/otherInfos"

/* Style */
import style from '../styles/filmDetail.module.scss'

// function responsible to show film details
// the page connect with an internal API to bring all information needed to show the film specifications
const FilmDetail = ({resultsFilm, resultsPeople, resultsSpecies, resultsPlanets, resultsVehicles, resultsStarships}) => {
    /* States */
    const [teamFilm, setTeamFilm] = useState([[],[],[]]);
    const [planetsFilm, setPlanetsFilm] = useState([]);
    const [speciesFilm, setSpeciesFilm] = useState([]);
    const [starshipsFilm, setStarshipsFilm] = useState([]);
    const [vehiclesFilm, setVehiclesFilm] = useState([]);    
    const [favoriteFilms, setFavoriteFilms] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false)

    //use effect to load itens from API
    useEffect(() => {     
        loadPeople();
        loadItens("swapiPlanets");
        loadItens("swapiSpecies");
        loadItens("swapiVehicles");
        loadItens("swapiStarships");
    }, []); 


    // set people to a state
    // I decided use 3 collumns  to avoid problems with the tooltip
    const loadPeople = async() => {
        let tempTeamFilm =  resultsFilm.characters;
        let filmTeamList = [];
        let data;

        data = resultsPeople

        let pagPeople = Math.ceil(tempTeamFilm.length/3);
        let tempTeamFilmTemp =  [];
        let i,x;
        for(i=0; i<pagPeople; i++){
            for(let x=0; x<data.length; x++){
                
                if(data[x].url === tempTeamFilm[i]){
                    filmTeamList = [...filmTeamList, data[x]]
                }
            }
        }
        
        tempTeamFilmTemp = [...tempTeamFilmTemp, filmTeamList];
        filmTeamList = []
        let looptill = i+pagPeople
        for(i=i; i<looptill; i++){
            for(x=0; x<data.length; x++){
                if(data[x].url === tempTeamFilm[i]){
                    filmTeamList = [...filmTeamList, data[x]]
                }
            }
        }

        tempTeamFilmTemp = [...tempTeamFilmTemp, filmTeamList];
        filmTeamList = []
        for(i=i; i<tempTeamFilm.length; i++){
            for(x=0; x<data.length; x++){
                if(data[x].url === tempTeamFilm[i]){
                    filmTeamList = [...filmTeamList, data[x]]
                }
            }
        }
        tempTeamFilmTemp = [...tempTeamFilmTemp, filmTeamList];
        setTeamFilm(tempTeamFilmTemp);
    }
    
    //  load and set to state all other itens about the film
    const loadItens = async (item) => {
        let itemToLoad, data;
        switch(item) {
            case "swapiPlanets":
                itemToLoad =  resultsFilm.planets;
                data = resultsPlanets;
                break;
            case "swapiSpecies":
                itemToLoad =  resultsFilm.species;
                data = resultsSpecies;
                break;
            case "swapiVehicles":
                itemToLoad =  resultsFilm.vehicles;
                data = resultsVehicles;
                break;
            case "swapiStarships":
                itemToLoad =  resultsFilm.starships;
                data = resultsStarships;
                break;
            default:
            // code 
        }

        let tempItensFilm =  itemToLoad;
        let filmItenList = [];

        for(let i=0; i<tempItensFilm.length; i++){
            for(let x=0; x<data.length; x++){
                if(data[x].url === tempItensFilm[i]){
                    filmItenList = [...filmItenList, data[x]]
                }
            }
        }
        
        switch(item) {
            case "swapiPlanets":
                setPlanetsFilm(filmItenList);
                break;
            case "swapiSpecies":
                setSpeciesFilm(filmItenList);
                break;
            case "swapiVehicles":
                setVehiclesFilm(filmItenList);
                break;
            case "swapiStarships":
                setStarshipsFilm(filmItenList);
                break;
            default:
              // code
        }
    }

    const favoriteFilm = (film) => {
        if(isFavorite){
            // delete favorite from list
            let favorite = [...favoriteFilms]
            let favSplice = favorite.splice(favorite.indexOf(resultsFilm.episode_id),1);
            setFavoriteFilms(favoriteFilms => favorite);
            setIsFavorite(false);
        } else{
            //insert favorite to the list
            setFavoriteFilms(favoriteFilms => [...favoriteFilms, film]);
        }
        
    }

    // get item from Local Storage and set to a State
    useEffect(() => {
        const data = localStorage.getItem('favorite-films');
        if(data){
            setFavoriteFilms(JSON.parse(data));
        }        
    }, [])

    //set film as favorite and save in local Storage
    useEffect(() => {
            localStorage.setItem("favorite-films", JSON.stringify(favoriteFilms))
            if(favoriteFilms.length >= 0){
                for(let i=0; i<favoriteFilms.length; i++){
                    if(favoriteFilms[i] === resultsFilm.episode_id){
                        setIsFavorite(true);
                    }
                }
            }            
    }, [favoriteFilms]);

    return (
        <div className={style.container}>            
            <Header breadcrumb="show" episode_id={resultsFilm.episode_id}/>
            <div className={style.content}>
                <FilmMainInfo  
                    episode_id={resultsFilm.episode_id} 
                    isFavorite={isFavorite ? "true" : "false"} 
                    favoriteFilm={favoriteFilm} 
                    opening_crawl={resultsFilm.opening_crawl} 
                    title={resultsFilm.title}
                    director={resultsFilm.director} 
                    producer={resultsFilm.producer}
                    release_date={resultsFilm.release_date}
                    buttomId=""/>
                <div className={style.specs}>
                    <div className={style.titleItem}><h2>Characters</h2></div>
                    <div className={style.people}>
                        <Characters list={teamFilm[0]}/>
                        <Characters list={teamFilm[1]}/>
                        <Characters list={teamFilm[2]}/>
                    </div>
                </div>
            </div>
            <div className={style.specs}>
                <div className={style.titleItem}><h2>Other Informations</h2></div>
                <div className={style.people}>
                    <OtherInfos list={planetsFilm} title="Planets"/>
                    <OtherInfos list={speciesFilm} title="Species"/>
                    <OtherInfos list={starshipsFilm} title="Starships"/>
                    <OtherInfos list={vehiclesFilm} title="Vehicles"/>
                </div>        
            </div>
            <p></p>
        </div>
        
    )
}

export default FilmDetail

/*
export async function getServerSideProps(context){
     // params contains the post `id`.
     let id = context.params.id

     //get the film information
     const resFilm = await fetch(`http://localhost:3000/api/film/${id}`);
     const dataFilm = await resFilm.json();
 
     const resPeople = await fetch(`http://localhost:3000/api/swapiPeople`);
     const dataPeople = await resPeople.json();
 
     const resSpecies = await fetch(`http://localhost:3000/api/swapiSpecies`);
     const dataSpecies = await resSpecies.json();
 
     const resPlanets = await fetch(`http://localhost:3000/api/swapiPlanets`);
     const dataPlanets = await resPlanets.json();
 
     const resVehicles = await fetch(`http://localhost:3000/api/swapiVehicles`);
     const dataVehicles = await resVehicles.json();
 
     const resStarships = await fetch(`http://localhost:3000/api/swapiStarships`);
     const dataStarships = await resStarships.json();
 
     return{
         props:{
             resultsFilm:dataFilm.results,
             resultsPeople:dataPeople.results,
             resultsSpecies:dataSpecies.results,
             resultsPlanets:dataPlanets.results,
             resultsVehicles:dataVehicles.results,
             resultsStarships:dataStarships.results
         }
     }
}
*/

export async function getStaticPaths() {
    return {
        paths: [
        { params: { id: '1' } },
        { params: { id: '2' } },
        { params: { id: '3' } },
        { params: { id: '4' } },
        { params: { id: '5' } },
        { params: { id: '6' } },
        ],
        fallback: false
    };
}

export async function getStaticProps(context) {
    // params contains the post `id`.
    let id = context.params.id

    //get the film information
    const resFilm = await fetch(`http://localhost:3000/api/film/${id}`);
    const dataFilm = await resFilm.json();

    const resPeople = await fetch(`http://localhost:3000/api/swapiPeople`);
    const dataPeople = await resPeople.json();

    const resSpecies = await fetch(`http://localhost:3000/api/swapiSpecies`);
    const dataSpecies = await resSpecies.json();

    const resPlanets = await fetch(`http://localhost:3000/api/swapiPlanets`);
    const dataPlanets = await resPlanets.json();

    const resVehicles = await fetch(`http://localhost:3000/api/swapiVehicles`);
    const dataVehicles = await resVehicles.json();

    const resStarships = await fetch(`http://localhost:3000/api/swapiStarships`);
    const dataStarships = await resStarships.json();

    return{
        props:{
            resultsFilm:dataFilm.results,
            resultsPeople:dataPeople.results,
            resultsSpecies:dataSpecies.results,
            resultsPlanets:dataPlanets.results,
            resultsVehicles:dataVehicles.results,
            resultsStarships:dataStarships.results
        }
    }
}

