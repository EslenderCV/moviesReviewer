import { Paper } from "@mui/material"
import InputBase from "@mui/material/InputBase";
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import { Dispatch, SetStateAction } from "react";

interface Props{
  setInput: Dispatch<SetStateAction<string>>
}

const SearchBar = ({ setInput }: Props) => {

  const debouce = (cb: Dispatch<SetStateAction<string>>, delay = 500) => {
    let timeout: ReturnType<typeof setTimeout>

    return(text: string) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(text)
        }, delay)
    }
  }

  const updateText = debouce((text) => setInput(text))
  
  return (<>
    <Paper sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '40%',
        height: '30px',
        padding: '20px 10px',
        borderRadius: '10px',
        color: '#000',
        backgroundColor: '#FFF'
    }}> 
        <TheaterComedyIcon sx={{color: 'primary.dark', fontSize: 27}}/>
        <InputBase id='search' placeholder='Type to search!' 
        sx={{color: '#000', 
        fontFamily: ['Roboto Mono', 'monospace'].join(','), 
        width: '90%', mt: .5, flex: 1, marginLeft: 1, 
        marginTop: 0, fontSize: 14}} onChange={e => updateText(e.target.value)}/>
    </Paper>
  </>
  )
}

export default SearchBar
