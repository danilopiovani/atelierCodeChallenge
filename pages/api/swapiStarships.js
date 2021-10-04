import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res) => {
    
    //get all people from all pages
    const resStarships = await fetch(`https://swapi.dev/api/starships/?format=json`);
    const dataStarships = await resStarships.json();

    let finalStarshipsList = dataStarships.results
    let numberPages = Math.ceil(dataStarships.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resStarshipsPage = await fetch(`https://swapi.dev/api/starships/?page=${i}&format=json`);
        const dataStarshipsPage = await resStarshipsPage.json();
        let pageStarshipsReturn = dataStarshipsPage.results;
        for(let x=0; x<pageStarshipsReturn.length; x++){
            finalStarshipsList = [...finalStarshipsList, pageStarshipsReturn[x]]
        }
        
    }

    res.status(200).json({
        results:finalStarshipsList
    })
}
