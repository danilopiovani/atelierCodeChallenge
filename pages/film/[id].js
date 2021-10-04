
//next + react
import { useContext, useEffect, useState } from "react";

/* Components */
import Header from "../../components/header"
import FilmMainInfo from "../../components/filmMainInfo"
import Characters from "../../components/characters"
import OtherInfos from "../../components/otherInfos"
import Tolltip from "../../components/tolltip"
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
                        <div className={style.peopleChild}>
                            {teamFilm[0].map((val,key) => (
                                <div className={style.personDetail} key={key}>
                                    <span className={style.imagePerson}><img width="20" height="20" src="/assets/person.png" /></span>{val.name}
                                    <Tolltip name={val.name} birth_year={val.birth_year} eye_color={val.eye_color} gender={val.gender}  hair_color={val.hair_color} skin_color={val.skin_color} />
                                </div>
                            ))}
                        </div>
                        <div className={style.peopleChild}>
                            {teamFilm[1].map((val,key) => (
                                <div className={style.personDetail} key={key}>
                                    <span className={style.imagePerson}><img width="20" height="20" src="/assets/person.png" /></span>{val.name}
                                    <Tolltip name={val.name} birth_year={val.birth_year} eye_color={val.eye_color} gender={val.gender}  hair_color={val.hair_color} skin_color={val.skin_color} />
                                </div>
                            ))}
                        </div>
                        <div className={style.peopleChild}>
                            {teamFilm[2].map((val,key) => (
                                <div className={style.personDetail} key={key}>
                                    <span className={style.imagePerson}><img width="20" height="20" src="/assets/person.png" /></span>{val.name}
                                    <Tolltip name={val.name} birth_year={val.birth_year} eye_color={val.eye_color} gender={val.gender}  hair_color={val.hair_color} skin_color={val.skin_color} />
                                </div>
                            ))}
                        </div>
                        {/*
                        <Characters list={teamFilm[0]}/>
                        <Characters list={teamFilm[1]}/>
                        <Characters list={teamFilm[2]}/>
                        */}
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
    let numberPages;

    //get the film information
    const resFilm = await fetch(`https://swapi.dev/api/films/${id}/?format=json`);
    const dataFilm = await resFilm.json();

    //People
    const resPeople = await fetch(`https://swapi.dev/api/people/?format=json`);
    const dataPeople = await resPeople.json();

    let finalPeopleList = dataPeople.results
    numberPages = Math.ceil(dataPeople.count/10);
    let i, x;
    for(i=2; i<=numberPages; i++){
        const resPeoplePage = await fetch(`https://swapi.dev/api/people/?page=${i}&format=json`);
        const dataPeoplePage = await resPeoplePage.json();
        let pagePeopleReturn = dataPeoplePage.results;
        for(x=0; x<pagePeopleReturn.length; x++){
            finalPeopleList = [...finalPeopleList, pagePeopleReturn[x]]
        }
        
    }
    
    // planets
    const resPlanets = await fetch(`https://swapi.dev/api/planets/?format=json`);
    const dataPlanets = await resPlanets.json();

    let finalPlanetsList = dataPlanets.results
    numberPages = Math.ceil(dataPlanets.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resPlanetsPage = await fetch(`https://swapi.dev/api/planets/?page=${i}&format=json`);
        const dataPlanetsPage = await resPlanetsPage.json();
        let pagePlanetsReturn = dataPlanetsPage.results;
        for(let x=0; x<pagePlanetsReturn.length; x++){
            finalPlanetsList = [...finalPlanetsList, pagePlanetsReturn[x]]
        }
        
    }


    // Species
    const resSpecies = await fetch(`https://swapi.dev/api/species/?format=json`);
    const dataSpecies = await resSpecies.json();

    let finalSpeciesList = dataSpecies.results
    numberPages = Math.ceil(dataSpecies.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resSpeciesPage = await fetch(`https://swapi.dev/api/species/?page=${i}&format=json`);
        const dataSpeciesPage = await resSpeciesPage.json();
        let pageSpeciesReturn = dataSpeciesPage.results;
        for(let x=0; x<pageSpeciesReturn.length; x++){
            finalSpeciesList = [...finalSpeciesList, pageSpeciesReturn[x]]
        }
        
    }

    // Vehicles
    const resVehicles = await fetch(`https://swapi.dev/api/vehicles/?format=json`);
    const dataVehicles = await resVehicles.json();

    let finalVehiclesList = dataVehicles.results
    numberPages = Math.ceil(dataVehicles.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resVehiclesPage = await fetch(`https://swapi.dev/api/vehicles/?page=${i}&format=json`);
        const dataVehiclesPage = await resVehiclesPage.json();
        let pageVehiclesReturn = dataVehiclesPage.results;
        for(let x=0; x<pageVehiclesReturn.length; x++){
            finalVehiclesList = [...finalVehiclesList, pageVehiclesReturn[x]]
        }
        
    }

    //starships
    const resStarships = await fetch(`https://swapi.dev/api/starships/?format=json`);
    const dataStarships = await resStarships.json();

    let finalStarshipsList = dataStarships.results
    numberPages = Math.ceil(dataStarships.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resStarshipsPage = await fetch(`https://swapi.dev/api/starships/?page=${i}&format=json`);
        const dataStarshipsPage = await resStarshipsPage.json();
        let pageStarshipsReturn = dataStarshipsPage.results;
        for(let x=0; x<pageStarshipsReturn.length; x++){
            finalStarshipsList = [...finalStarshipsList, pageStarshipsReturn[x]]
        }
        
    }

    return{
        props:{
            resultsFilm:dataFilm,
            resultsPeople:finalPeopleList,
            resultsSpecies:finalSpeciesList,
            resultsPlanets:finalPlanetsList,
            resultsVehicles:finalVehiclesList,
            resultsStarships:finalStarshipsList
        }
    }
}

