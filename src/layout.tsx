import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SearchBar from './Components/SearchBar';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import SearchResults from './Components/SearchResults';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { movies } from './Components/moviesProps';

let moviesInfo: movies[] | null | undefined

fetch('https://moviesapigcloud-dgzarlas2q-uc.a.run.app').then(res => res.json())
    .then(data => {moviesInfo = data})
    .catch(err => console.log(err))

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

interface Props{
  children: ReactNode,
  icon: ReactNode,
  to: string
}

function MyApp({ children, icon, to }: Props) {

  const [input, setInput] = useState('')

  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return <>
    <Box
    sx={{
      width: '100vw',
      height: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden'
    }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: 3,
        width: '100%'
      }}>

        <SearchBar setInput={setInput}/>
        <Link to={to} style={{textDecoration: 'none'}}>
          <Typography sx={{display: 'flex', 
          alignItems: 'center', 
          fontWeight: 'bold', 
          letterSpacing: 3, 
          border: '1px solid',
          borderRadius: 3,
          width: '40px',
          height: '40px',
          fontSize: 14  ,
          justifyContent: 'center',
          color: 'text.primary',
          }}>{icon}
          </Typography>
        </Link>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit" sx={{
            backgroundColor: 'background.paper',
            height: '40px',
            width: '40px'
        }}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Box>
      <Box sx={{
        height: '100%'
      }}>
        <SearchResults moviesInfo={moviesInfo} Search={input} setSearch={setInput}>
            {children}
        </SearchResults>
      </Box>
    </Box>
  </>

}

export default function Layout({ children, icon, to }: Props) {
  const getMode: 'light' | 'dark' = localStorage.getItem('mode') === 'light' ? 'light' : 'dark'

  const [mode, setMode] = useState<'light' | 'dark' >(getMode); 

  useEffect(() => {
    localStorage.setItem('mode', mode)
  }, [mode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {

        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,  
          text: { 
            primary: mode === 'dark' ? '#DDDDDD': '#0C0C0C',
            secondary: mode === 'dark' ? '#EEEEEE' : '#3A3845'
          },
          background: {
            default: mode === 'dark' ? '#040D12' : '#FFF2D7',
            paper: mode === 'dark' ? '#183D3D' : '#D99E4A'
          }, 

          divider: mode === 'dark' ? '#EEEEEE' : '#3A3845'
        },

        typography: {
          fontFamily: ['Roboto Mono', 'monospace'].join(','),
        }
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp icon={icon} to={to}>
          {children}
        </MyApp>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
