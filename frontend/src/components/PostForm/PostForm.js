import { Grid, TextField, Container } from '@mui/material'
import CardMedia from '@mui/material/CardMedia';
import { Box, Button, Typography } from '@mui/material'
import {publishPost, editPost, resetMessage} from "../../slices/postSlice"
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState, useRef, useMemo} from "react"
import { ExportedDrawerWidth } from "../Navbar/Navbar"
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { useNavigate} from "react-router-dom"
import Message from '../Message/Message';
import JoditEditor from 'jodit-react';


// CALENDAR IMPORTS
import 'dayjs/locale/pt-br' // load on demand
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';




function PostForm({title, setTitle,text, setText, postImages, setPostImages, postToUpdate, setPostToUpdate, usersAllowed, setUsersAllowed, handleClosePostForm}) {
    const [selectedDate, setSelectedDate]= useState(null)
    useEffect(()=>{
      if(postToUpdate){
        if(postToUpdate.title){
          setTitle(postToUpdate.title)
        }
        if(postToUpdate.text){
          setText(postToUpdate.text)
        }
    
      }else{
        setTitle("")
        setText("")
        setUsersAllowed("")
      }
    }, [postToUpdate]) 

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { error:postError, message:postMessage, loading: postLoading} = useSelector((state)=> state.post)
    

    const handleSubmit = async (e)=>{
        e.preventDefault()
        let formatedDate = dayjs(selectedDate).locale("pt-br").format("LL")
        let reportDate =  String(formatedDate)
        const postData = {title,text,postImages, usersAllowed, reportDate}
        const formData = new FormData();
        const postFormData = Object.keys(postData).forEach((key) => formData.append(key, postData[key]))
        console.log(postData)
        formData.append("post", postFormData)
        dispatch(publishPost(formData))
        setTitle("")
        setText("")
        setPostImages("")
        setUsersAllowed("")
        setSelectedDate(null)
        dispatch(resetMessage())
        
      }
      
      const handleFile = (e)=>{
        const postImages = e.target.files[0]
        console.log(postImages)
        setPostImages(postImages)
      }

      const ImportedDrawerWidth =  ExportedDrawerWidth
     
      // Jodit Text Editor
      const editor = useRef(null);
      const config = useMemo((placeholder)=>{ return {readonly: false, toolbarAdaptive:true,  removeButtons:['image','strikethrough','paragraph','classSpan','lineHeight','superscript','subscript','file','video','speechRecognize','spellcheck','cut','copyformat','hr','table','link','symbols','indent','outdent', 'showall'], placeholder: placeholder || 'Compartilhe suas experiencias...'}},[]);
  
  return (
  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
    <Container sx={{width: { md: `calc(100% - ${ImportedDrawerWidth}px)`, marginTop:9} }}>

    <Box sx={{ marginLeft:{ md:`${ImportedDrawerWidth}px`} }}>
      <Typography sx={{ textAlign:"center",marginTop:2}} component="h1" variant="h3" display="block" gutterBottom>
                  Escreva sobre suas experiências                                     
      </Typography>
      <Typography sx={{ textAlign:"center",marginTop:2, marginBottom:10}} component="p" variant="h5" color="text.secondary"  display="block" gutterBottom>
                      Reconheça a sua evolução                                
      </Typography>
      <form  onSubmit={handleSubmit} autoComplete="off" encType="multipart/form-data">

        <Grid container spacing={1}>
            <Grid xs={12} lg={7} item>
              <TextField
              onChange={(e)=> setTitle(e.target.value)}
              value={title} 
              variant="outlined" 
              label="Título" 
              placeholder="Insira o título da sua publicação"
              error={title.length > 0 && title.length < 3 }
              helperText={ title.length > 0 && title.length < 3? "título precisa ter, no mínimo, 3 caracteres":""}
              fullWidth
              required
              />
              
            </Grid>
            <Grid xs={12} lg={5} item >
              <DesktopDatePicker
                label="Data da sua experiência"
                inputFormat="DD/MM/YYYY"
                renderInput={(params)=> <TextField {...params} sx={{width:"100%"}}/>}
                InputProps={{sx:{}}}
                value={selectedDate}
                onChange={(value)=>{setSelectedDate(value)}}
                
              />

            </Grid>

            <Grid xs={12} item >
              <Box  sx={{position:"relative"}}>
               
               <JoditEditor
                  config={config}
                  ref={editor}
                  value={text}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setText(newContent)}
                  onChange={newContent => {}}
                />
                <Box className='photoIcon'>
                  <label >
                      <CameraAltIcon/> <input type="file" accept="image/" onChange={handleFile} />
                  </label>
                </Box>
                
              </Box>
              

                {postImages &&
                  <>
                   <Typography sx={{marginTop:2}} variant="overline" gutterBottom color="textSecondary"> Preview da Imagem: </Typography>
                    <CardMedia sx={{marginTop:2}} component="img" height="300" image={postImages? URL.createObjectURL(postImages): ""}
                    alt="Preview da immagem"/>
                  </>
                }

            </Grid>
            <Grid xs={12} item >
              <TextField
                sx={{marginTop: 1}}
                onChange={(e)=> setUsersAllowed( e.target.value)}
                value={usersAllowed}
                variant="outlined" 
                label="Permissão" 
                placeholder="Email de quem poderá acessar esta publicação "
                fullWidth            
              />
              
            </Grid>

            <Grid xs={12} item >
              {!postLoading ? 
                <Button sx={{marginTop: 1}} id ="" type="submit" color="custom"variant="contained" fullWidth >Publicar</Button>:

                <Button sx={{marginTop: 1}} id ="" type="submit" disabled variant="contained" fullWidth >Publicando...</Button>
              }
              {postError&&
              <Message  message={postError} type="error"/>
               
              }
              
              {( postMessage && postMessage.includes("Meu Perfil") && !postError) &&                
                <Message message={postMessage} type="success"/>
                
              }
               
              
            </Grid>
        </Grid>              
        
      </form>
    </Box>
    </Container>
    </LocalizationProvider>
  )
}
export default PostForm