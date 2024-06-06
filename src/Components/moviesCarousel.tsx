import Carousel from "react-material-ui-carousel"
import { Paper, Box, Typography, Button, Divider  } from "@mui/material"
import { moviesProps } from "./moviesProps"
import { Link } from "react-router-dom"

const MovieCarousel = ({ moviesInfo }: moviesProps) => {

  return (
    <Box sx={{
        width: '100vw',
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    }}>
        <Carousel>
            {moviesInfo?.slice(0, 4).map((item) => (
                <Paper key={item.imdbId}>
                    <Box sx={{
                        height: '100%',
                        backgroundColor: 'background.default',
                        display: 'flex'
                    }}>
                        <Box sx={{
                            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${item.backdrops[Math.floor(Math.random() * 10)]})`,
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: '90vh',
                            backgroungSize: 'cover',
                            backgroundPosition: 'center',
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <Box sx={{
                                display: {
                                    lg: 'flex',
                                    xs: 'column'
                                },
                                justifyContent: {lg: 'space-evenly', xs: 'center' },
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: '7%'
                            }}>
                                <Box sx={{
                                    height: '300px',
                                    overflow: 'hidden',
                                    width: {
                                        xs: '100%',
                                        lg: 'auto'
                                    },
                                    display: 'flex', 
                                    justifyContent: 'center'
                                }}>
                                    <style>
                                        {`
                                            .poster {
                                                border-radius: 15px;
                                                border: 1px solid gold;
                                            }
                                        `}
                                    </style>
                                    <img src={item.poster} key={item.poster} height={'300px'} width={'200px'} className="poster"/>
                                </Box>
                                <Box 
                                sx={{
                                    color: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: 2,
                                    borderRadius: 20,
                                    textAlign: 'center'
                                }}>
                                    <Typography variant="h5" key={item.title} sx={{fontWeight: 'bold'}}>{item.title}</Typography>
                                    <Typography><i key={item.releaseDate}>{item.releaseDate}</i></Typography>
                                </Box>
                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                    <Link to={`/movies?id=${item.imdbId}`}>
                                        <Button variant="contained" 
                                            sx={{
                                                backgroundColor: 'white', 
                                                color: '#000',
                                                transition: '.2s',
                                                '&:hover': {
                                                    background: '#FFF',
                                                    scale: '1.06'
                                                }
                                            }}
                                        >
                                            Review
                                        </Button>
                                    </Link>
                                    &nbsp;&nbsp;
                                    <Divider orientation='vertical' sx={{border: '1px solid white'}} flexItem/>&nbsp;&nbsp;
                                    <a href={item.trailerLink} key={item.trailerLink} target='_blank'>
                                        <Button variant="contained" 
                                            sx={{
                                                backgroundColor: 'white', 
                                                color: '#000',
                                                transition: '.2s',
                                                '&:hover': {
                                                    background: '#FFF',
                                                    scale: '1.06'
                                                }
                                            }}
                                        >
                                            Watch Trailer
                                        </Button>
                                    </a>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Carousel>
    </Box>
  )
}

export default MovieCarousel
