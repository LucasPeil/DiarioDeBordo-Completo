import { TextField } from '@mui/material'
import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {publishPost} from "../slices/postSlice"

function PostForm() {


  return (
  <form  onSubmit={handleSubmit}>
    <div>

      <TextField label="Títlo" variant="filled" sx={{marginBottom: 2}} onChange={(e)=> setTitle(e.target.value)} value={title}/>
    </div>

    <div>
    <TextField label="Compartilhe sua experiência..." multiline minRows={4} onChange={(e)=>setText(e.target.value)} value={text}/>
    </div>
    
    <div>
     <input type="file" onChange={handleFile} /> 
 
    </div>

    <div>
      <Button id ="" type="submit" variant="contained" >Enviar</Button>
    </div>                   
     
      
  </form>
  )
}

export default PostForm