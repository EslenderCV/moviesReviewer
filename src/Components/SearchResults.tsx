import { ReactNode } from "react"
import { movies } from "./moviesProps"
import { Box, Typography, Divider } from "@mui/material"
import { Link } from "react-router-dom"
import { Dispatch, SetStateAction } from "react"

interface Props {
    children: ReactNode,
    Search: string,
    moviesInfo?: movies[] | null | void,
    setSearch: Dispatch<SetStateAction<string>>
}

 


const SearchResults = ({ children, Search, moviesInfo, setSearch }: Props) => {
  const getMovies:movies[] = []
    
  moviesInfo?.map((item) => {
    if(item.title.toLowerCase().includes(Search.toLowerCase()) ){
        getMovies.push(item)
    }
  })

  return (
    <>
        {
            Search === '' 
            ? 
                children
            :
                moviesInfo?.length === 0 
                ? 
                    <Typography>No movies available</Typography>
                :  
                    getMovies.length === 0 
                    ?
                        <Typography>We're sorry! No movies were found!</Typography>
                    :
                    <Box sx={{margin: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100vw'}}>
                    <Typography variant='h4' sx={{fontWeight: 'bold'}}>Movies to review!</Typography>
                    <Divider orientation="horizontal" flexItem sx={{margin: 2}}/>
                    <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { 
                        lg: 'auto auto auto auto auto',
                        sm: 'auto auto',
                        xs: 'auto'
                    }, 
                    height: '90vh',
                    overflowY: 'auto'
                    }}>
                        {getMovies.map((item) => (
                        <>
                            <Link to={`/movies?id=${item.imdbId}`} onClick={() => {setSearch('')}}>
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
                            </Link>
                        </>
                        ))}
                    </Box>
                </Box>
        }
    </>
  )
}

export default SearchResults
