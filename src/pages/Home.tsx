import Layout from '../layout'
import MovieCarousel from '../Components/moviesCarousel'
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined'
import { movies } from '../Components/moviesProps'
import { useEffect, useState } from 'react'

const Home = () => {
  const [movie, setMovie] = useState<movies[] | null | undefined>(undefined)

  useEffect(() => {
    let moviesInfo: movies[] | null | undefined
    fetch('http://localhost:8080/api/v1/movies').then(res => res.json())
    .then(data => {
      moviesInfo = data.reverse()

      setMovie(moviesInfo)
    })
    .catch(err => console.log(err))


  }, [])

  return (
    <Layout icon={<LocalMoviesOutlinedIcon/>} to='/movies'>
        <MovieCarousel moviesInfo={movie}/>
    </Layout>
  )
}

export default Home