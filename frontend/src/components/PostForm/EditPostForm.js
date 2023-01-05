import { Grid, TextField, Container } from '@mui/material'
import { Box, Button } from '@mui/material'
import {publishPost, editPost, resetMessage, getPost} from "../../slices/postSlice"
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState, useMemo, useRef} from "react"
import { ExportedDrawerWidth } from "../Navbar/Navbar"
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { uploads } from "../../utils/config"
import { useNavigate} from "react-router-dom"
import Message from '../Message/Message';
import JoditEditor from 'jodit-react';

// CALENDAR IMPORTS
import 'dayjs/locale/pt-br' // load on demand
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

function EditPostForm({sharedPostToUpdate,title, setTitle,text, setText, postImages, setPostImages, postToUpdate, setPostToUpdate, usersAllowed, setUsersAllowed, handleClosePostForm}) {
   const {id} = useParams()
    //const [usersAllowedToBeUpdated, setUsersAllowedToBeUpdated] = useState("")
    //const [usersAllowedReady, setUsersAllowedReady] = useState([])
     // let usersAllowedToBeUpdated;
     const { post, loading: postLoading, error: postError, message: postMessage} = useSelector((state)=> state.post)
     const {user, loading, error} = useSelector((state)=> state.user)
     const dispatch = useDispatch() 
     const navigate = useNavigate()
     const [timeoutOptimization, setTimeoutOptimization] = useState(false)
     useEffect(()=>{
      dispatch(getPost(id))
      console.log(post)
  }, [dispatch, id])
  
  useEffect(()=>{
    if(post){
      if(post.title){
        setTitle(post.title)
      }
      if(post.text){
        setText(post.text)
      } 
    }else{
      setTitle("")
      setText("")
      setUsersAllowed("")
    }
    

},[post])
    
      
      
    
      const editor = useRef(null);
      const config = useMemo((placeholder)=>{ return {readonly: false, toolbarAdaptive:true,  removeButtons:['image','strikethrough','paragraph','classSpan','lineHeight','superscript','subscript','file','video','speechRecognize','spellcheck','cut','copyformat','hr','table','link','symbols','indent','outdent', 'showall'], placeholder: placeholder || 'Compartilhe suas experiencias...'}},[]);
      
      const handleSubmit = async (e)=>{
          e.preventDefault()
          let postDataUpdated
         
            postDataUpdated = {title: title, text: text, usersAllowed, id: post._id}
            
          dispatch(editPost(postDataUpdated))
          setPostToUpdate(null)
          setTitle("")
          setText("")
          dispatch(resetMessage())  
          navigate("/profile")
        
        }
        
        setTimeout(() => {
          setTimeoutOptimization(true)
        }, 1000);
    
  
        const ImportedDrawerWidth =  0
        
    return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
     
     <Container  sx={{width: { md: `calc(100% - ${ExportedDrawerWidth}px)` },  marginLeft:{ md:`${ExportedDrawerWidth}px`} }}>
     {timeoutOptimization && 
        <form  onSubmit={handleSubmit} autoComplete="off">
  
          <Grid container spacing={1}>
              <Grid xs={12} item>
                <TextField
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
                sx={{marginTop: 2}} 
                variant="outlined" 
                label="Título" 
                placeholder="Insira o título da sua publicação"
                error={title.length > 0 && title.length < 3 }
                helperText={ title.length > 0 && title.length < 3? "título precisa ter, no mínimo, 3 caracteres":""}
                fullWidth
                required
                
              />
  
              </Grid>
        
              <Grid xs={12} item >
                <Box  sx={{ position:"relative"}}>

                <JoditEditor
                  config={config}
                  ref={editor}
                  value={text}
                  tabIndex={1} // tabIndex of textarea
                  onBlur={newContent => setText(newContent)}
                  onChange={newContent => {}}
                />
                 
                 
                </Box>
              </Grid>
              { !post.usersAllowed.includes(user.email) &&
              <Grid xs={12} item >
                <TextField
                  onChange={(e)=> setUsersAllowed(e.target.value)}
                  value={usersAllowed}
                  variant="outlined" 
                  label="Permissão" 
                  placeholder="Email de quem poderá acessar esta publicação "
                  fullWidth            
                />
                
              </Grid>
            }
              
  
              <Grid xs={12} item >
    
                {!postLoading ? 
                <Button id ="" type="submit" color="custom" variant="contained" fullWidth >Editar</Button>:

                <Button id ="" type="submit" disabled variant="contained" fullWidth >Aguarde...</Button>
              }
                
               {/* {postError  && <Message message={postError} type="error"/> }
     
                 {(postMessage  && !postError) &&                
                  <Message message={postMessage} type="success"/>
                  
                }*/}
                
              </Grid>
  
          </Grid>              
          
            
        </form>
  }
      </Container>
    
    </LocalizationProvider>
    )
  }
  
  export default EditPostForm