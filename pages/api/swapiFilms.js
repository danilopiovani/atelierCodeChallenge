import fetch from 'isomorphic-unfetch';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res) => {
    const resFilms = await fetch(`https://swapi.dev/api/films/?format=json`);
    const dataFilms = await resFilms.json();

    res.status(200).json({
        results:dataFilms.results
    })
}
