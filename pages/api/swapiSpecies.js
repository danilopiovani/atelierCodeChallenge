import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res) => {
    
    const resSpecies = await fetch(`https://swapi.dev/api/species/?format=json`);
    const dataSpecies = await resSpecies.json();

    let finalSpeciesList = dataSpecies.results
    let numberPages = Math.ceil(dataSpecies.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resSpeciesPage = await fetch(`https://swapi.dev/api/species/?page=${i}&format=json`);
        const dataSpeciesPage = await resSpeciesPage.json();
        let pageSpeciesReturn = dataSpeciesPage.results;
        for(let x=0; x<pageSpeciesReturn.length; x++){
            finalSpeciesList = [...finalSpeciesList, pageSpeciesReturn[x]]
        }
        
    }

    res.status(200).json({
        results:finalSpeciesList
    })
}
