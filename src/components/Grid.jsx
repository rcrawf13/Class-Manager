import { DataGrid } from '@mui/x-data-grid';
import "./grid.css"
import useRowStore from '../data store/useRowStore';
import { Box, Fab } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const Grid = () => {
  
  const {rows,updateRows} = useRowStore();
  const handleCDropdownChange = (fieldName,newValue,params) => {
    
    const newRows = rows.map((record) => {
      
        if(record.id === params.id) 
        {
          localStorage.setItem(record.id,JSON.stringify({...record,[fieldName]:newValue}))
          return {...record,[fieldName]:newValue}
        } else 
          {
            return record
          }
          

        
        })
        console.log(newRows)
      updateRows(newRows)
      // get key from local storage

      }

const getSelectDefaultVal = (params, fieldName) => {
  const recordStr = localStorage.getItem(params.id);
  if (!recordStr) return ''; // or default fallback
  // returns an empty string to the defaultValue prop : defaultValue = {''}

  const record = JSON.parse(recordStr);
  return record[fieldName] || ''; // safe fallback if field missing
}

  const handleDelete = (params) => {
    // Loop through rows
    // match on params.id
    const newRows = rows.filter(record => record && record.id !== params.id);


    
    updateRows(newRows)
    localStorage.removeItem(params.id)
  } 
  

  const columns = [
    {field:'class', headerName:'Class', width:130,
        headerClassName: 'custom-colum',
        headerAlign: 'center',
        renderCell: (params)=> (
        <select defaultValue={getSelectDefaultVal(params, 'class')} onChange={(e)=>handleCDropdownChange('class',e.target.value,params)} name='classOptions' id='class'>
            <option value="" hidden> </option>
            <option value="ENTR 3000">ENTR 3000</option>
            <option value="FIN 4150">FIN 4150</option>
            <option value="VFIN 4980">FIN 4980</option>
            <option value="STQM 5420">STQM 5420</option>
            <option value="STQM 5900">STQM 5900</option>
        </select>
      )

    },
    {field:'assignment', headerName:'Assignment', width:130},
    {field:'type', headerName:'Type',width:130,
      renderCell: (params)=> (
        <select defaultValue={getSelectDefaultVal(params, 'type')} onChange={(e)=>handleCDropdownChange('type',e.target.value,params)} name="typeOptions" id="type">
            <option value=""hidden> </option>
            <option value="quiz">Quiz</option>
            <option value="discussion">Discussion</option>
            <option value="exam">Exam</option>
            <option value="homework">Homework</option>
        </select>
      )
    },
    {field:'duedate', headerName:'Due Date',width:130},
    {field:'daysleft', headerName:'Days Left',width:130},
    {field:'priority', headerName:'Priority',width:130,

      renderCell: (params)=> (
        <select defaultValue={getSelectDefaultVal(params, 'priority')} onChange={(e)=>handleCDropdownChange('priority',e.target.value,params)} name="priorityOptions" id="priority">
            <option value=""hidden> </option>         
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
        </select>
      )
    },
    {field:'status', headerName:'Status',width:130,
      renderCell: (params)=> (
        <select defaultValue={getSelectDefaultVal(params, 'status')} onChange={(e)=>handleCDropdownChange('status',e.target.value,params)} name="statusOptions" id="status">
          <option value=""hidden> </option>
          <option value="inProgress">In Progress</option>
          <option value="notStarted">Not Started</option>
          <option value="completed">Completed</option>

        </select>
      )
    },
    {field:'deleteButton', headerName:'', width:'auto',
      renderCell: (params)=> (
        <Box sx={{display:'flex', gap:'1rem'} }>
          <Fab onClick={()=>handleDelete(params)}>
              <DeleteIcon/>
          </Fab>   
        </Box>
      )
    },

  ];

  

  return (
    <>
          <DataGrid 
            rows={rows}
            columns={columns}
            checkboxSelection={false}
            rowHeight={70}
            disableRowSelectionOnClick
            sx={{height:'100%'}}
          >
          </DataGrid>
    </>
  )
}

export default Grid