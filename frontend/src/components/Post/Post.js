import { Button, Stack, Box, Avatar, Container, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPost } from '../../slices/postSlice'
import { uploads } from '../../utils/config'
import Typography from '@mui/material/Typography';
import { ExportedDrawerWidth } from "../Navbar/Navbar"

///CARD IMPORTS FROM MATERIAL UI

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { deletePost} from "../../slices/postSlice"

const Post = ({handleEditPost, postToUpdate, setPostToUpdate}) => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const { post, loading: postLoading, error: postError, message: postMessage} = useSelector((state)=> state.post)
    const { user, loading } = useSelector((state) => state.user);
    const{user:userAuth} = useSelector((state)=> state.auth)
   useEffect(()=>{
        dispatch(getPost(postToUpdate._id))
    }, [dispatch, postToUpdate])
    

    const handleDelete = (id)=>{
      dispatch(deletePost(id))
 
  }

  const ImportedDrawerWidth =  0
  return (
    <Container  sx={{border:"1px solid blue", width: { sm: `calc(100% + ${ImportedDrawerWidth}px)`, marginTop:9} }}>
    
        <Card sx={{ maxWidth: 900, marginLeft:{ xs:"auto", sm:"auto"}, marginRight:{ xs:"auto", sm:"auto"}}}>
                          
                          <CardHeader  
                            avatar={
                              <Avatar sx={{ width: 40  , height: 40}} alt="Foto do usuário" src={ user.profileImage ? user.profileImage: ""}/> 
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
                                            <CardMedia className=""  component="img" height="300" image={post.postImages}
                                            alt="Foto Publicação"/>
                                            ):
                                            
                                            (<CardMedia className=""  component="img" height="300" image={`images/photoDefault1.png`}
                                            alt="Foto Publicação"/>
                                            )
                                        
                          }
                          <Divider></Divider>
                          <CardContent>
                          <div dangerouslySetInnerHTML={{__html: post.text}}></div>
                              {user._id != userAuth._id &&
                                <Box sx={{marginTop:2}}>
                                    <Button onClick={()=> handleDelete(post._id)} variant="contained" color ="error" >Deletar</Button>
                                    <Button onClick={()=> handleEditPost(post)} variant="contained" color ="primary" >Editar</Button>
                                </Box>
                               }
                          </CardContent>
          </Card>
     
          </Container>


 
  )
}

export default Post

   /*<div>
        <h1>{post.title}</h1>
        <img src={`${uploads}/postsImages/${post.postImages}`}/>
        <p>{post.text}</p>
        <div>
          <Button onClick={()=>{ handleEdit(post);}} color="secondary">Editar</Button>
        </div>
  </div>*/