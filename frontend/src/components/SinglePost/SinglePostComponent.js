import {  Stack, Box, Avatar, Container, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../../slices/postSlice'

import Typography from '@mui/material/Typography';
import { ExportedDrawerWidth } from "../Navbar/Navbar"
import EditIcon from '@mui/icons-material/Edit';

///CARD IMPORTS FROM MATERIAL UI

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { deletePost} from "../../slices/postSlice"

const SinglePostComponent = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const { post, loading: postLoading, error: postError, message: postMessage} = useSelector((state)=> state.post)
    const { user, loading } = useSelector((state) => state.user);
    const{user:userAuth} = useSelector((state)=> state.auth)
    const [timeoutOptimization, setTimeoutOptimization] = useState(false)
    const navigate = useNavigate()
    
   useEffect(()=>{
        dispatch(getPost(id))
    }, [dispatch, id])
    

    const handleDelete = (id)=>{
      dispatch(deletePost(id))
 
  }
  setTimeout(() => {
    setTimeoutOptimization(true)
  }, 1000);

  return (
    
    <Container  sx={{width: { md: `calc(100% - ${ExportedDrawerWidth}px)` },  marginLeft:{ md:`${ExportedDrawerWidth}px`} }}>
        {timeoutOptimization && 
        <Card sx={{ maxWidth: 900, marginLeft:{ xs:"auto", sm:"auto"}, marginRight:{ xs:"auto", sm:"auto"}}}>
                          
                          <CardHeader  
                            avatar={
                              <Avatar sx={{ width: 40  , height: 40}} alt="Foto do usuário" src={ user.profileImage ? user.profileImage.url: ""}/> 
                            }
                            title={<Typography sx={{textAlign:"center", marginTop:1}}  variant="h5"> {post.title} </Typography>} 
                            subheader={
                              post.reportDate ?
                              <Typography sx={{ textAlign:"center",marginTop:1}} variant="caption" display="block" color="text.secondary" gutterBottom>
                                  Relato ocorrido em: {post.reportDate}
                              </Typography>
                              :
                              ""
                          } 
                            />
                          { post.postImages ? (
                                            <CardMedia className=""  component="img" height="300" image={post.postImages.url}
                                            alt="Foto Publicação"/>
                                            ):
                                            
                                            (<CardMedia className=""  component="img" height="300" image={`images/photoDefault1.png`}
                                            alt="Foto Publicação"/>
                                            )
                                        
                          }
                          <Divider></Divider>
                          <CardContent>
                          <div dangerouslySetInnerHTML={{__html: post.text}}></div>
                              {user._id == userAuth._id &&
                                <Box sx={{position:"relative"}} >
                                <Stack  direction="row" alignItems="end" justifyContent="end" sx={{bottom:"-2em", position:"relative"}} >
                                    <button sx={{color:"#7D28D6"}} className="EditButton clickable" onClick={()=> navigate(`/editPost/${post._id}`)} ><EditIcon  fontSize="small"/></button>
                                </Stack>
                            </Box>
                               }
                          </CardContent>
          </Card>
}
          </Container>


    
  )
}

export default SinglePostComponent