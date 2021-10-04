import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res) => {
    
    const resPlanets = await fetch(`https://swapi.dev/api/planets/?format=json`);
    const dataPlanets = await resPlanets.json();

    let finalPlanetsList = dataPlanets.results
    let numberPages = Math.ceil(dataPlanets.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resPlanetsPage = await fetch(`https://swapi.dev/api/planets/?page=${i}&format=json`);
        const dataPlanetsPage = await resPlanetsPage.json();
        let pagePlanetsReturn = dataPlanetsPage.results;
        for(let x=0; x<pagePlanetsReturn.length; x++){
            finalPlanetsList = [...finalPlanetsList, pagePlanetsReturn[x]]
        }
        
    }

    res.status(200).json({
        results:finalPlanetsList
    })
}
