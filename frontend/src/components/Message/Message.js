
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./Message.css"
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const Message = ({message, type, editing}) => {
  const[open, setOpen] = useState(true)
  return (
    <div className={editing ? "editingPost": ""} >
    <Box  sx={{width:"100%"}}>
        <Collapse in={open}>
        <Alert severity={type} action={
              <IconButton
                  aria-label='close'
                  color='inherit'
                  size='small'
                  onClick={()=>{setOpen(false)}}  
              >
                  <CloseIcon fontSize='inherit'/>
              </IconButton>
        }
        sx={{mt:2}}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
    </div>
 
  )
}

export default Message