import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res) => {
    
    //get all people from all pages
    const resVehicles = await fetch(`https://swapi.dev/api/vehicles/?format=json`);
    const dataVehicles = await resVehicles.json();

    let finalVehiclesList = dataVehicles.results
    let numberPages = Math.ceil(dataVehicles.count/10);
    
    for(let i=2; i<=numberPages; i++){
        const resVehiclesPage = await fetch(`https://swapi.dev/api/vehicles/?page=${i}&format=json`);
        const dataVehiclesPage = await resVehiclesPage.json();
        let pageVehiclesReturn = dataVehiclesPage.results;
        for(let x=0; x<pageVehiclesReturn.length; x++){
            finalVehiclesList = [...finalVehiclesList, pageVehiclesReturn[x]]
        }
        
    }

    res.status(200).json({
        results:finalVehiclesList
    })
}
