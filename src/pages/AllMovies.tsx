import Layout from "../layout"
import { Box, Typography, Divider } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import { useSearchParams } from "react-router-dom";
import { SetURLSearchParams } from "react-router-dom";
import Reviewer from "../Components/Reviewer";
import { movies } from "../Components/moviesProps";
import { useEffect, useState } from "react";

interface displayProps{
  params: URLSearchParams,
  setParams: SetURLSearchParams,
  moviess?: movies[] | null | void
}

const Displayer = ({params, setParams, moviess}: displayProps) => {
  const urlParams = new URLSearchParams(window.location.search).get('id');

  const des = urlParams === null || String(urlParams) === '' ? 
        <MovieDisplay params={params} setParams={setParams} moviess={moviess}/>
      :
        <Reviewer/>

  return des
}

const MovieDisplay = ({params, setParams, moviess}: displayProps) => {
  console.log(params)

  return (
  <>
    <Typography variant='h4' sx={{fontWeight: 'bold'}}>Movies to review!</Typography>
    <Divider orientation="horizontal" flexItem sx={{margin: 2}}/>
    <Box sx={{
        display: 'grid',
        gridTemplateColumns: { 
          lg: 'auto auto auto auto auto',
          sm: 'auto auto',
          xs: 'auto'
        }, 
        height: '75vh',
        overflowY: 'auto'
    }}>
        {moviess?.map((item) => (
          <div key={item.imdbId} onClick={() => setParams({id: `${item.imdbId}`})}>
              <Box sx={{
                margin: 2,
                width: '200px', 
                height: '300px',
                borderRadius: '20px', 
                position: 'relative',
                display: 'flex',
                overflow: 'hidden',
                transition: '.3s',
                '&:hover': {
                  scale: '1.03',
                  cursor: 'pointer'
                }
              }}>
                <img src={item.poster} alt="" width="200px" height="300px"/>
            </Box>
          </div>
        ))}
    </Box>
  </>
  )
}

const AllMovies = () => {

  const [params, setParams] = useSearchParams()
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
    <Layout icon={<HomeIcon/>} to="/">
      <Box sx={{margin: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw'}}>
        <Displayer params={params} setParams={setParams} moviess={movie}/>
      </Box>
    </Layout>
  )
}

export default AllMovies
