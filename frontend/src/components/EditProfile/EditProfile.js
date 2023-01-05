import React, { useEffect, useState } from 'react'
import {Button, Card, CardContent, Box, Grid, TextField, Typography} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"

import {updateProfile, profile, resetMessage} from "../../slices/userSlice"
import Message from "../Message/Message"

const EditProfile = ({profileToUpdate, handleCloseEditProfile}) => {

const { user, message, error, loading } = useSelector((state) => state.user);
const dispatch = useDispatch()
const [name, setName] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [profileImage, setProfileImage] = useState("");
const [bio, setBio] = useState("");
const [previewImage, setPreviewImage] = useState("");


  useEffect(()=>{
    if(profileToUpdate){
    
    if(profileToUpdate.username){
        setUsername(profileToUpdate.username)
        }
      
      if(profileToUpdate.profileImage){
      setProfileImage(profileToUpdate.profileImage)
      }
      if(profileToUpdate.bio){
        setBio(profileToUpdate.bio)
      }
      if(profileToUpdate.name){
        setName(profileToUpdate.name)
      }
     /* if(profileToUpdate.password){
        setPassword(profileToUpdate.password)
      }
      if(profileToUpdate.confirmPassword){
        setConfirmPassword(profileToUpdate.confirmPassword)
      }*/

    
  }
}, [profileToUpdate])

const handleSubmit = async (e)=>{
    e.preventDefault()
    const updatedData = {username,name,}
   if(name){
      updatedData.name = name
    }

    if(bio){
      updatedData.bio = bio
    }else{
      updatedData.bio=""
    }

    if(profileImage){
      updatedData.profileImage = profileImage
    }
    if(password){
      updatedData.password = password
    }
    

    const formData = new FormData();

    const userFormData = Object.keys(updatedData).forEach((key) => formData.append(key, updatedData[key]));

    formData.append("user", userFormData);
    
    dispatch(updateProfile(formData))
    dispatch(resetMessage())

// handleCloseEditProfile()
    
  
    
  }

  const handleFile = (e)=>{
    const profileImage = e.target.files[0]
    setProfileImage(profileImage)
  }

    return (

        <Box style={{marginTop: "5em"}} display="flex" flexDirection="column" justifyContent="end" alignItems="center">
                
                <Card style={{maxWidth:500, padding:"1em 2em"}}>
                
                    <Typography gutterBottom variant ="h4" align="center"> 
                        Edite seus dados
                    </Typography>
            
    
                    <CardContent>
                      
    
                        <form  autoComplete='off' onSubmit={handleSubmit}>
    
                        <Grid container spacing={1} >
                        
                                  <Grid xs={12}  item>
                                    <TextField
                                        onChange={(e) => setName(e.target.value)} 
                                        value={name}
                                        sx={{marginTop: 2}} 
                                        variant="outlined" 
                                        label="Nome"
                                        placeholder="Insira seu nome"
                                        fullWidth
                                     
                                    />
                                  </Grid>
    
                                  <Grid xs={12}  item>
                                      <TextField
                                          onChange={(e) => setUsername(e.target.value)} 
                                          value={username} 
                                          variant="outlined" 
                                          label="Nome de Usuário"
                                          placeholder="Insira seu nome de usuário"
                                          fullWidth
                                          
                                      />
                                  </Grid>

                                  <Grid xs={12}  item>
                                <TextField
                                    onChange={(e) => setBio(e.target.value)} 
                                    value={bio}
                                    multiline 
                                    minRows={5}
                                    variant="outlined" 
                                    label="Biografia"
                                    placeholder="Descreva-se em poucas palavras"
                                    fullWidth
                                   
                                />
                              </Grid>
                              <Grid xs={12}  item>
                                  <TextField
                                      type="password"
                                      onChange={(e)=> setPassword(e.target.value)}
                                      variant = "outlined"
                                      label= "Senha"
                                      placeholder="Senha"
                                      value={password}
                                      fullWidth
                                      
                                  />
                              </Grid>

                              
                              
    
                                <Grid xs={12}  item>
    
                                {!loading?
                                    <Button id ="" sx={{marginTop: 2}} type="submit" variant="contained" color="primary" fullWidth >Editar</Button> 
                                      :
                                    <Button id ="" sx={{marginTop: 2}} type="submit" variant="contained" disabled  fullWidth>Aguarde...</Button>     
                                }   
                                {error && <Message  message={error} type="error"/> }
                                {message  &&  <Message  message={message} type="success"/>}
                                
                                </Grid>
                                
                                
                                  <Grid xs={12}  item>
                                    <input type="file" onChange={handleFile} />  
                                  </Grid>   
                                
                            
                            </Grid>
                          </form>
                    </CardContent>
                </Card>
                
            </Box>
       
               // <Button sx={{marginTop:3}} type="submit" variant='contained'>{buttonText}</Button>
    
      )
}

export default EditProfile