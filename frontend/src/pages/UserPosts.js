 import { Box, Button, Stack, Grid, Modal, Divider } from "@mui/material"
import {useState,useEffect, useRef } from "react"
 import { useDispatch, useSelector } from 'react-redux'
import { getUserPosts, deletePost, editPost, resetMessage } from "../slices/postSlice"
import {profile, updateProfile} from "../slices/userSlice"
import { uploads } from "../utils/config"
import { useParams, useNavigate } from "react-router-dom";
import { ExportedDrawerWidth } from "../components/Navbar/Navbar"
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
import Message from "../components/Message/Message"
import LoadingComponent from "../components/LoadingComponent"
import NoPosts from "../components/NoPosts/NoPosts"


 const UserPosts = ({ handleOpenPostEvent, openSinglePostComponent, handleEditPost, profileImage,setProfileImage,handleEditProfileEvent}) =>{

   
    const { user, loading } = useSelector((state) => state.user);
   

    const {user: userAuth} = useSelector((state)=> state.auth)
    const {posts, loading: postLoading, error: postError, message: postMessage} = useSelector((state)=> state.post)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Profile image modal
    const [openProfileImage, setOpenProfileImage]= useState(false)
    const handleOpenProfileImage = ()=> setOpenProfileImage(true)
    const handleCloseProfileImage = () => setOpenProfileImage(false)
    const [previewImage, setPreviewImage] = useState("");
    let profileImageUrl = ""



useEffect(()=>{
        dispatch(profile())
    
        dispatch(getUserPosts(user._id))
    
        
        
    },[dispatch])


    const modalStyle={ position: "absolute", top:"50%",left:"50%",transform:"translate(-50%,-50%)", width:400,bgcolor: "white",p:4,borderRadius: "5"}
    
    //Excluir publicação
    const handleDelete = (id)=>{
        dispatch(deletePost(id))
    }

    // Abre o Modal para editar foto de perfil
    const handleProfileImage = ()=>{
       handleOpenProfileImage()
    }

    // Abre o Modal para editar DADOS do usuario
  

    // Lida com o envio da foto de pefil
    const handleSubmitProfileImage = (e)=>{
        e.preventDefault()
        const userData = {}
        if(profileImage){
        userData.profileImage = profileImage
        }
        
        const formData = new FormData();
        const userFormData = Object.keys(userData).forEach((key) =>
            formData.append(key, userData[key])
        );
  
        formData.append("user", userFormData);
  
        dispatch(updateProfile(formData))
        dispatch(resetMessage())
        handleCloseProfileImage()
     }

    
        
     const handleFile = (e)=>{
        const profileImage = e.target.files[0]
        setProfileImage(profileImage)
        setPreviewImage(profileImage);
      }
      
      const centralizePostsBox = ExportedDrawerWidth/2
     
     

    return(
       
        <Box sx={{width: { md: `calc(100% - ${ExportedDrawerWidth}px)` },  marginLeft:{ md:`${ExportedDrawerWidth}px`} }}>

            {/* Inicio - Modal de edição da foto*/}
            <Modal open={openProfileImage} onClose={handleCloseProfileImage} aria-labelledby="Botão para editar foto">
                <Box sx={modalStyle}>
                    <form onSubmit={handleSubmitProfileImage}>
                    <Stack justifyContent="center" >
                        <Box  sx={{textAlign:"center"}}>
                            {user.profielImage ?
                                <Avatar sx={{ width: 100  , height: 100, marginLeft:"auto", marginRight:"auto", marginBottom:2 }} alt="Foto do usuário"src={  user.profileImage.url}/>
                                :
                                <Avatar sx={{ width: 100  , height: 100, marginLeft:"auto", marginRight:"auto", marginBottom:2 }} alt="Foto do usuário"src={ previewImage && URL.createObjectURL(previewImage)}/>
                            }
                            
                            <Grid  alignItems="center" xs={12}  item>
                                <label className="updateProfileImage" >                                                         
                                Atualize sua foto <input type="file" onChange={handleFile} />
                                </label>
                            </Grid>
                            <Button sx={{marginTop:1}} onClick={()=>{handleCloseProfileImage()}} >Cancelar</Button>
                            <Button sx={{marginTop:1}} type="submit">Ok</Button>
                        </Box>
                    </Stack>    
                    </form>    
                </Box>
            </Modal>
            {/* Final - Modal de edição da foto*/}

         {/*Cabeçalha da pagina, onde é mostrado informações a respeito do usuario */}    
        {user&&
            <Box sx={{ height:{xs:250}}}>
                <Stack sx={{}} direction="row"  spacing={1} alignItems="center" justifyContent="center">
                
                    <Avatar onClick={()=>handleProfileImage()} className="clickable"  sx={{ width: 100  , height: 100, marginRight:3 }} alt="Foto do usuário" src={ (user && user.profileImage) ? user.profileImage.url: ""}/> 
                    
                    <Box sx={{textAlign:"start"}}>
                        <Stack direction="row" justifyContent="space-between" >
                        <Typography variant="h5" component="h2"> {user.name}</Typography>
                        <Button sx={{color:"#000000"}}  color="info" fontSize="small"  onClick={()=> handleEditProfileEvent(user)}><EditIcon/></Button>
                        </Stack>
                        
                        <Typography sx={{}} color="textSecondary" variant="body2"> {user.username}</Typography>
                        <Typography sx={{marginTop:2}} color="textSecondary"> {user.bio}</Typography>
                        
                        
                    </Box>
                </Stack>
                <form >
                        <Grid xs={12}  item>
                                <input type="file" onChange={handleFile} />  
                        </Grid>    
                </form> 

                

            </Box>
            }
            
            <Container> <Divider/></Container>

            {/* Começo dos posts*/}
              {user&& 
              <Box sx={{width: { sm: `calc(100% - ${ExportedDrawerWidth}px)`, position:"relative"},  marginLeft:{ sm:`${centralizePostsBox}px`} ,marginTop:9}}>
                
                {postLoading && <LoadingComponent/>}
                 
               
                
                {postError && !postLoading && !postError.includes("tente novamente")  && <Message  message={postError} type="error" editing={true}/>}

                {(postMessage  && !postError &&  !postLoading) &&                
                
                    <Message message={postMessage} type="success" editing={true}/>

                }
                {  !postLoading &&
                    <Grid  container spacing={1}>
                        
                            {
                                posts.map((post)=>( 
                                    <Grid  key={post._id} sx={{marginTop:5}} xs={12} lg={6} xl={4} item>
                                         
                                         <Card  sx={{maxWidth: 450, marginLeft:{ xs:"auto", sm:"auto",lg:"auto"}, marginRight:{ xs:"auto", sm:"auto", lg:"auto"}}}>
                                        <CardHeader 
                                                avatar={
                                                    <Avatar sx={{ width: 40  , height: 40}} alt="Foto do usuário" src={ user.profileImage ? user.profileImage.url: ""}/> 
                                                }
                                                title={<Typography sx={{textAlign:"center", marginTop:1}}  variant="h5"> {post.title} </Typography>}
                                                subheader={
                                                    post.reportDate !="Invalid Date" &&
                                                    <Typography sx={{ textAlign:"center",marginTop:1}} variant="caption" display="block" color="text.secondary" gutterBottom>
                                                        Relato ocorrido em: {post.reportDate}
                                                    </Typography>
                                                    
                                                } 
                                            />
                                        
                                        { post.postImages ? (
                                            <CardMedia className="clickable" onClick={()=>  navigate(`/singlePost/${post._id}`) } component="img" height="300" image={ post.postImages.url}
                                            alt="Foto Publicação"/>
                                            ):
                                            
                                            (<CardMedia className="clickable" onClick={()=> navigate(`/singlePost/${post._id}`)} component="img" height="300" image={"/images/photoDefault1.png"}
                                            alt="Foto Publicação"/>
                                            )
                                        
                                        }
                    
                                        <CardContent >
                                        
                                         {post.text && ( 
                                            <>
                                                <div className="postTextPreview" dangerouslySetInnerHTML={{__html: post.text.slice(0,50) }}></div>
                                       
                                                {post.text.length > 40 && <span onClick={()=> navigate(`/singlePost/${post._id}`)} className="expandText">...mais</span>}
                                            </> 
                                         )}
                                            <Box sx={{position:"relative"}} >
                                                <Stack  direction="row" alignItems="end" justifyContent="end" sx={{bottom:"-2em", position:"relative"}} >
                                                    <button sx={{color:"#7D28D6"}} className="DeleteButton clickable" onClick={()=> handleDelete(post._id)}  ><DeleteIcon fontSize="small"/></button>
                                                    <button sx={{color:"#7D28D6"}} className="EditButton clickable" onClick={()=> navigate(`/editPost/${post._id}`)} ><EditIcon  fontSize="small"/></button>
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
                }
              
        </Box>
  );
}


{/*<div className="clickable" onClick={()=> handleOpenPostEvent(post)} >
                                                  {post.text.slice(0,50)}  {post.text.length > 40 && <span className="expandText">...mais</span>}            
                                            </div>
                                    */}
                    


        
 
 export default UserPosts