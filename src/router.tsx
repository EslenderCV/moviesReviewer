import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import AllMovies from './pages/AllMovies'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/movies',
        element: <AllMovies/>
    }
])