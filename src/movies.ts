import { movies } from "./Components/moviesProps"

export const getMovies = () => {
    let datas: movies[] | undefined | null

    fetch('http://localhost:8080/api/v1/movies').then(res => res.json())
    .then(data => {datas = data})
    .catch(err => {console.log(err)})

    return datas;
}