import { Box, Button, Stack, Grid, Modal, Divider } from "@mui/material"
import {useState,useEffect, useRef, } from "react"
 import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts, deletePost, editPost,getAllowedPosts, resetMessage } from "../../slices/postSlice"
import {profile, updateProfile} from "../../slices/userSlice"
import { uploads } from "../../utils/config"
import { useParams, useNavigate } from "react-router-dom";
import { ExportedDrawerWidth } from "../Navbar/Navbar"
import { Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// cards import
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Container } from "@mui/system"
import EditIcon from '@mui/icons-material/Edit';
import Message from "../Message/Message"
import LoadingComponent from "../LoadingComponent"

const AllowedPostsComponent = ({setSharedPostToUpdate,handleOpenPostEvent, handleEditSharedPost}) => {

    const {posts,loading: postLoading, error: postError, message: postMessage} = useSelector((state)=> state.post)
    const { user, loading } = useSelector((state) => state.user);
    const {user: userAuth} = useSelector((state)=> state.auth)
    const textRef = useRef()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
   
    useEffect(()=>{
        dispatch(getAllowedPosts(userAuth.token))
      
    },[dispatch])

    const handleDelete = (id)=>{
        dispatch(deletePost(id))
        dispatch(resetMessage())
    }
    const centralizePostsBox = ExportedDrawerWidth/2
    console.log(posts)

  return (
    <Box sx={{width: { md: `calc(100% - ${ExportedDrawerWidth}px)` },  marginLeft:{ md:`${ExportedDrawerWidth}px`} }}>
        

      {/*}  <Container sx={{ display:{xs:"none", sm:"block"}}}> <Divider/></Container> */}
        {!posts && <p>Você ainda não tem acesso a publicações de outros usuário</p>}
        <Box sx={{width: { sm: `calc(100% - ${ExportedDrawerWidth}px)`, position:"relative"},  marginLeft:{ sm:`${centralizePostsBox}px`} ,marginTop:9}}>
            {postLoading && <LoadingComponent/>}
            
            {posts && !postLoading &&
            <Grid  container spacing={1}>
                        
                            {
                                posts.map((post)=>( 
                                    <Grid  key={post._id}  xs={12} lg={6} xl={4} item>
                                         
                                         <Card  sx={{maxWidth: 450, marginLeft:{ xs:"auto", sm:"auto",lg:"auto"}, marginRight:{ xs:"auto", sm:"auto", lg:"auto"}}}>
                                        <CardHeader 
                                                avatar={
                                                    <Avatar sx={{ width: 40  , height: 40}} alt="Foto do usuário" src={ post.userProfileImage ? post.userProfileImage.url: ""}/> 
                                                }
                                                title={<Typography sx={{textAlign:"center", marginTop:1}}  variant="h5"> {post.title} </Typography>}
                                                subheader={
                                                    post.reportDate != "Invalid Date" ?
                                                    <Typography sx={{ textAlign:"center",marginTop:1}} variant="caption" display="block" color="text.secondary" gutterBottom>
                                                        Relato ocorrido em: {post.reportDate}
                                                    </Typography>
                                                    :
                                                    ""
                                                }
                                               
                                            />
                                             
                                        
                                        { post.postImages ? (
                                            <CardMedia className="clickable" onClick={()=>  navigate(`/singlePost/${post._id}`)} component="img" height="300" image={post.postImages.url}
                                            alt="Foto Publicação"/>
                                            ):
                                            
                                            (<CardMedia className="clickable" onClick={()=>  navigate(`/singlePost/${post._id}`)} component="img" height="300" image={`images/photoDefault1.png`}
                                            alt="Foto Publicação"/>
                                            )
                                        
                                        }
                    
                                        <CardContent>
                                        
                                            <div className="postTextPreview" dangerouslySetInnerHTML={{__html: post.text.slice(0,50) }}></div>
                                            {post.text.length > 40 && <span onClick={()=>  navigate(`/singlePost/${post._id}`)} className="expandText">...mais</span>}
                                        
                                            <Typography sx={{marginTop:3, display:"block", textAlign:"center"}} variant="caption" color="text.secondary" gutterBottom>
                                              Publicado por por {post.userName}. 
                                            </Typography>
                                        
                                            <Box sx={{position:"relative"}} >
                                                <Stack  direction="row" alignItems="end" justifyContent="end" sx={{bottom:"-1em", position:"relative"}} >
                                                   {/* <button sx={{color:"#7D28D6"}} className="DeleteButton clickable" onClick={()=> handleDelete(post._id)}  ><DeleteIcon fontSize="small"/></button>*/}
                                                    <button sx={{color:"#7D28D6"}} className="EditButton clickable" onClick={()=>{setSharedPostToUpdate(post); navigate(`/editPost/${post._id}`)}} ><EditIcon  fontSize="small"/></button>
                                                </Stack>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                    
                                    </Grid>
                                ))
                                
                            }   

                       
                    </Grid>
    }

        </Box>
    </Box>
)
}

export default AllowedPostsComponent