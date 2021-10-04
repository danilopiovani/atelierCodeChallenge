import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res) => {
    let urlDetail = req.query.urlDetail

    const resPeople = await fetch(`https://swapi.dev/api/people/?format=json`);
    const dataPeople = await resPeople.json();

    let finalPeopleList = dataPeople.results
    let numberPages = Math.ceil(dataPeople.count/10);
    let i, x;
    for(i=2; i<=numberPages; i++){
        const resPeoplePage = await fetch(`https://swapi.dev/api/people/?page=${i}&format=json`);
        const dataPeoplePage = await resPeoplePage.json();
        let pagePeopleReturn = dataPeoplePage.results;
        for(x=0; x<pagePeopleReturn.length; x++){
            finalPeopleList = [...finalPeopleList, pagePeopleReturn[x]]
        }
        
    }

    res.status(200).json({
        results:finalPeopleList
    })
}
