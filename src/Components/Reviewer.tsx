import { movies } from "./moviesProps"
import { Typography, Box, Divider, Button, Paper } from "@mui/material";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import { useEffect, useState } from "react";

let timeout: ReturnType<typeof setTimeout>

  const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
    box-sizing: border-box;
    width: 300px;
    min-height: 100px;
    max-height: 100px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px 12px 0 12px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

interface reviewsProps {
  movie: movies | void
}

const movieReview = (imdbId: string, body: string) => {
  fetch("http://localhost:8080/api/v1/reviews", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: `{
            "reviewBody": "${body}",
            "imdbId": "${imdbId}"
          }`,
    })
    .then(res => {
      res.ok 
      
      ?
        alert('Thanks for leaving your review!')
      :
      alert('Opps! Something unexpected happened, please try again!')

    })
    .catch((err) => console.log(err));

    eraseText();
}

function eraseText() {
  const text = document.getElementById("textReview")! as HTMLInputElement;
  text.value = '';
}

const ReviewerLayout = ({movie}: reviewsProps) => {

  const [value, setValue] = useState('');

  return <>

    {movie?
        <Box sx={{
          width: '100vw',
          overflowX: 'hidden',
          height: '90vh',
          padding: 3,
          paddingTop: 0,
          overflowY: 'auto',
        }} key={movie?.imdbId}>
          <Box sx={{
            margin: 2, 
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingRight: 2,
          }}>
            <Link to='/movies'>
              <ExitToAppOutlinedIcon sx={{fontSize: 50, cursor: 'pointer', color: 'text.primary'}}/>
            </Link>
            <Typography variant="h5" sx={{textAlign: 'right', fontWeight: 'bold'}}>{movie.title}<Typography sx={{fontSize: 14}}>{movie?.releaseDate}</Typography></Typography>
          </Box>
          <Divider orientation="horizontal" flexItem/>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { 
              lg: 'auto auto auto auto auto',
              sm: 'auto auto auto auto',
              xs: 'auto auto auto'
            }, 
            marginTop: 2,
            justifyContent: 'center'
          }}>
            {movie?.genres.map((gen, index) => {
              return <>
                <Typography key={index} sx={{marginLeft: 3, textAlign: 'center'}}>{gen}</Typography>
              </>
            })}
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 4,
          }}>
            <Box sx={{
              width: '100%',
              padding: 2,
              display: 'flex',
              flexDirection: {
                lg: 'row',
                sm: 'column',
                xs: 'column'
              },
              justifyContent: 'space-around',
              gap: 2,
              alignItems: 'center'
            }}>
              <Box sx={{
                width: '200px',
                height: '300px',
                borderRadius: 7,
                overflow: 'hidden',
                border: `1px solid #434D5B`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={movie?.poster} width="100%" height="100%"/>
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <Textarea aria-label="empty textarea" id="textReview" placeholder="Leave your review here!" onChange={(v) => setValue(v.target.value)}/>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'right', 
                  gap: 2,
                  margin: 2
                }}>
                  <Button variant="outlined" color="error" startIcon={<CleaningServicesOutlinedIcon/>} onClick={() => eraseText()}>
                    Clear
                  </Button>
                  <Button variant="outlined" color="success" endIcon={<SendIcon/>} onClick={() => movieReview(movie?.imdbId, value)}>
                    Send
                  </Button>
                </Box>
              </Box>
            </Box>
            <Typography variant="h5" sx={{fontWeight: 'bold', textAlign: 'center', margin: 4}}>Reviews</Typography>
            <Paper sx={{
              overflowY: 'auto',
              width: '98%',
              borderRadius: 3,
              margin: 3,
              height: 'auto',
              maxHeight: '300px',
              textAlign: 'center'
            }}>
                { movie?.reviewIds.length > 0 
                
                ? movie?.reviewIds.map((review, index) => {
                  return <Box sx={{ width: '100%'}}>
                    <Typography key={index} 
                    sx={{
                      padding: 3, 
                      borderRadius: 3,
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      borderBottom: '1px solid',
                      width: '100%',
                    }}>
                      <InsertCommentOutlinedIcon/>{review.body}
                    </Typography>
                  </Box>
                  })
                :
                    <Typography sx={{
                      fontSize: 14,
                      margin: 4
                    }}>No reviews available, watch the movie and let everyone know your thoughts about it!</Typography>
              }
            </Paper>
          </Box>
        </Box>
    : 
        <>
        <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
      </>
    }
  </>
}



const Reviewer = () => {




  const [movie, setMovie] = useState<movies | void | undefined>(undefined)
  useEffect(() => {
    let moviesInfo: movies[] | null | undefined

    fetch('http://localhost:8080/api/v1/movies').then(res => res.json())
    .then(data => {
      moviesInfo = data
      const urlParams = new URLSearchParams(window.location.search).get('id'); 

      const moviee: movies | void  = urlParams != null ? moviesInfo?.find(({ imdbId }) => imdbId === `${urlParams}`) : undefined
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          setMovie(moviee)
        }, 1000)
      
    })
    .catch(err => console.log(err))

  }, [])
  
  return <ReviewerLayout movie={movie}/>
  
 
}

export default Reviewer
