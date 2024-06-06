import { movies } from "./Components/moviesProps"

export const getMovies = () => {
    let datas: movies[] | undefined | null

    fetch('https://moviesapigcloud-dgzarlas2q-uc.a.run.app').then(res => res.json())
    .then(data => {datas = data})
    .catch(err => {console.log(err)})

    return datas;
}