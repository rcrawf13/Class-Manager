import { Modal, Paper,TextField,Button,Box,Typography } from "@mui/material"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import useRowStore from "../data store/useRowStore";

import { useState } from "react";
const CreateEntry = ({handleClose,isOpen}) => {

const {recordStructure,insertIntoRows,date,setDate,incrementId,id} = useRowStore();
const [assignmentValue,setAssignmentValue] = useState('');

const submitRecordPrep = () => {
  const milliSecondsPerDay = 86400000;
  const difference = date - new Date();

  const days = Math.ceil(difference / milliSecondsPerDay)
  const newRecordEntry = { ...recordStructure,daysleft:days , assignment: assignmentValue, duedate: date, id:id };
  insertIntoRows(newRecordEntry);
  console.log(newRecordEntry);
  
  localStorage.setItem(`${id}`,JSON.stringify(newRecordEntry))
  incrementId();
};




  return (
    <>
        <Modal
            open={isOpen}
            onClose={handleClose}
            sx={{display:'flex',justifyContent:'center',alignItems:'center'}}
        >
            <Paper sx={{ height:'auto',width:'30%', display:'flex',justifyContent:'center',alignItems:'center', flexDirection:'column',gap:'2rem',padding:'1rem'}}>
                <Typography variant="h4">Create Row</Typography>
                <Box sx={{display:'flex',flexDirection:'column', gap:'2rem'}}>
                <TextField
                  label = 'Assignment'
                  value={assignmentValue}
                  onChange={(e) => setAssignmentValue(e.target.value)}
                />


                 <DatePicker
                    label="Due Date"
                    value={date}
                    onChange={(selectedDay) => {
                      const dateOnly = selectedDay
                        ? new Date(selectedDay.toDateString())
                        : null;
                      setDate(dateOnly);
                    }}
                    minDate={new Date()}
                    format="dd/MM/yyyy"
                  />

                </Box>
                <Button onKeyDown={(e)=>e.key==="Enter"?console.log('Enter'):null} onClick={()=>{
                  submitRecordPrep()
                  handleClose()
                }}>Submit</Button>
            </Paper>

        </Modal>
    
    </>
  )
}

export default CreateEntry