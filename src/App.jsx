import './App.css'
import Grid from './components/Grid'
import { Fab, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import './index.css'
import CreateEntry from './components/CreateEntry'

import { useState,useEffect } from 'react'
import useRowStore from './data store/useRowStore'

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () =>setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const {setId,id,updateRows} = useRowStore()


  useEffect(()=>{
    // retrieve local storage
      const localStorageKeys = Object.keys(localStorage);
      let highestKey = -1;
      let rows = []
      for(let i = 0; i < localStorageKeys.length; i++) {
        let key = localStorageKeys[i];

        let record = JSON.parse(localStorage.getItem(key))
        rows.push(record)



        let num = parseInt(key);
        if (num >= highestKey) {
          highestKey = num;
          setId(highestKey+1)
        }  
      }
      updateRows(rows)
  },[])

 

  return (
    <Paper>
      <Grid/>

      <Fab id='add' 
        onKeyDown={(e)=>{
          console.log(e.key)
          if(e.key === "Enter") {
          handleOpen()
          console.log(isOpen)

        }
      }

      }
      onClick={()=>{
        handleOpen()
        console.log(isOpen)
        }}>
        <AddIcon/>
      </Fab>


        <CreateEntry
          id={id}
          setId={setId}
          isOpen={isOpen}          // <-- this was missing
          handleOpen={setIsOpen}
          handleClose={handleClose}
        />
    </Paper>
  )
}

export default App
