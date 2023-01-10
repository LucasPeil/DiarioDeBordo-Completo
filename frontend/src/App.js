
import './App.css';
import { useState } from 'react';
import Login from "./pages/Login"
import UserPosts from "./pages/UserPosts"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import PostForm from './components/PostForm/PostForm';
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register';
import {Stack} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { useAuthorization } from './hooks/useAuthorization';
import Dashbord from "./pages/Dashbord"
import {resetMessage} from "./slices/userSlice"

import { Modal, Box } from '@mui/material';
import ProfileInfo from './components/ProfileInfo/ProfileInfo';
import EditPostForm from './components/PostForm/EditPostForm';
import EditProfile from './components/EditProfile/EditProfile';
import AllowedPostsComponent from "./components/AllowedPostsComponent/AllowedPostsComponent";
import LoadingComponent from './components/LoadingComponent';
import SinglePostComponent from './components/SinglePost/SinglePostComponent';
function App() {
  const {auth, loading} = useAuthorization()
  const dispatch = useDispatch()
  //post data
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [postImages, setPostImages] = useState()

  // User profile data
  const [name, setName] = useState("")
  const[bio, setBio] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [usersAllowed, setUsersAllowed] = useState("")

// < MODAL - Edit Profile>
const [openEditProfile, setOpenEditProfile]= useState(false)
const handleOpenEditProfile = ()=> setOpenEditProfile(true)
const handleCloseEditProfile = () =>{ 
    setOpenEditProfile(false)
    dispatch(resetMessage())
    
}
const [profileToUpdate, setProfileToUpdate] = useState("")
const handleEditProfileEvent = (user)=>{
  setProfileToUpdate(user)
  dispatch(resetMessage())
  handleOpenEditProfile() 
}


const [openPostForm, setOpenPostForm] = useState(false)
const handleOpenPostForm = ()=> setOpenPostForm(true)
const [postToUpdate, setPostToUpdate] = useState("")
const [sharedPostToUpdate, setSharedPostToUpdate] = useState("")
const [singlePost, setSinglePost] = useState(false)
const handleClosePostForm = ()=>{ 
      setOpenPostForm(false)
      setPostToUpdate(false) 
      setSharedPostToUpdate(false)   
}


const [openSinglePost, setOpenSinglePost] = useState(false)
const handleOpenSinglePost = ()=> setOpenSinglePost(true)
const handleCloseSinglePost = ()=>{ 
  setOpenSinglePost(false)
  setPostToUpdate(false)
  setSharedPostToUpdate(false) 
}
const handleOpenPostEvent = (post)=>{
  setPostToUpdate(post)
  handleOpenSinglePost(true)

}

//</MODAL -  open single post>     
  const handleEditPost = (post)=>{
    setPostToUpdate(post)
    handleOpenPostForm(true)
  }
  const handleEditSharedPost = (post)=>{
    setSharedPostToUpdate(post)
    handleOpenPostForm(true)
  }

  if (loading){
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ marginRight:{sx:"0px", sm:"100px"},height:"100vh", }}  >
        <LoadingComponent/>
      </Stack> 
    )
  }

  return (
 
    <div className="App">
       
      <BrowserRouter>
      {auth &&
        <Navbar />
      }
 

        {/* Inicio - Modal de edição do perfil*/}
        <Modal  open={openEditProfile} onClose={handleCloseEditProfile} aria-labelledby="Botão para editar foto">
            <Box className="modalStyle editProfileModal"> 
              <EditProfile profileToUpdate={profileToUpdate} handleCloseEditProfile={handleCloseEditProfile}/>
            </Box>
        </Modal>
        
        <Routes>

          <Route path='/' element={ auth ? <PostForm buttonText="Publicar" text={text} setText={setText} title={title} setTitle={setTitle} postImages={postImages} setPostImages={setPostImages}  postToUpdate={postToUpdate}  setPostToUpdate={setPostToUpdate} usersAllowed={usersAllowed} setUsersAllowed={setUsersAllowed}/> : <Navigate to="/login"/> } />
          
          <Route path="register" element={!auth ? <Register email={email} setEmail={setEmail} password={password} setPassword={setPassword} 
          confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} bio={bio} setBio={setBio} name={name} setName={setName} username={username} setUsername={setUsername} 
          profileImage={profileImage} setProfileImage={setProfileImage}  profileToUpdate = {profileToUpdate} setProfileToUpdate={setProfileToUpdate} handleCloseEditProfile={handleCloseEditProfile} buttonText= "Registre-se" /> : <Navigate to="/" />} />
          
          <Route path="/user/:id" element={auth? <ProfileInfo/>: <Navigate to="/login"/>} />
          
          <Route path="login" element={ !auth? <Login/>: <Navigate to="/" />} />
          <Route path="/singlePost/:id" element={ auth ?<SinglePostComponent/>: <Navigate to="/login"/>} />
          <Route path="/editPost/:id" element={ auth ? <EditPostForm sharedPostToUpdate={sharedPostToUpdate} text={text} setText={setText} title={title} setTitle={setTitle} postImages={postImages} setPostImages={setPostImages}  postToUpdate={postToUpdate} setPostToUpdate={setPostToUpdate} usersAllowed={usersAllowed} setUsersAllowed={setUsersAllowed} handleClosePostForm={handleClosePostForm} /> : <Navigate to="/login"/>} />
          
          <Route path="/allowedposts" element={ auth ?
            <AllowedPostsComponent setSharedPostToUpdate={setSharedPostToUpdate}  handleOpenPostEvent={handleOpenPostEvent} 
            handleEditSharedPost={handleEditSharedPost}  /> 
                : 
            <Navigate to="/login"/>} 
          />
          
          <Route path="/profile" element={auth ?
            <UserPosts handleOpenPostEvent={handleOpenPostEvent}  openEditProfile={openEditProfile}
               handleOpenEditProfile={handleOpenEditProfile}  
              handleEditProfileEvent={ handleEditProfileEvent} handleEditPost={handleEditPost}  
              profileImage={profileImage} setProfileImage={setProfileImage}/>  
              : 
            <Navigate to="/" />}
          />
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
