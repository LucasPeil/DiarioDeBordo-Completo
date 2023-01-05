import React, { useEffect, useState , useNavigate} from 'react'
import {Button, Card, CardContent, Box, Grid, TextField, Typography} from "@mui/material"
import { useSelector, useDispatch } from "react-redux"
import {login, register, reset,} from "../slices/authSlice"
import {updateProfile} from "../slices/userSlice"
import Message from '../components/Message/Message'
const Register = ({bio, setBio, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,name, setName, username,setUsername, profileImage, setProfileImage,  profileToUpdate, setProfileToUpdate, handleCloseEditProfile, buttonText }) => {
    
  
  const dispatch = useDispatch()
  

  const { loading, error } = useSelector((state) => state.auth);

    const handleSubmit = async (e)=>{
      e.preventDefault()
     
      const user = {name, email, password, username, confirmPassword, profileImage}
      //console.log(user)
      dispatch(register(user))
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setUsername("")
      setName("")
      
    }

    


  return (

    <Box style={{marginTop: "5em"}} display="flex" flexDirection="column" justifyContent="end" alignItems="center">
            
            <Card style={{maxWidth:500, padding:"1em 2em"}}>
            
                <Typography gutterBottom variant ="h4" align="center"> 
                    Registre-se
                </Typography>
                
                

                <CardContent>
                  {buttonText ==="Registre-se" &&
                    <Typography gutterBottom color="textSecondary" variant="body2" component="p" > 
                       Faça uma conta para você e comece a compartilhar sua experiencia com outros usuários
                    </Typography>
                    
                  }

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

                          {buttonText === "Registre-se" &&
                              <Grid xs={12}  item>
                                <TextField
                                        type="email"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        variant = "outlined"
                                        label= "Email"
                                        placeholder="E-mail"
                                        value={email}
                                        fullWidth
                                        required
                                    />
              
                              </Grid>
                            }
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
                          {buttonText==="Editar" && 
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
                              }

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
                                  <TextField
                                      type="password"
                                      onChange={(e)=> setConfirmPassword(e.target.value)} 
                                      value={confirmPassword} 
                                      variant="outlined" 
                                      label="Confirme sua senha"
                                      placeholder="Confirme sua senha"
                                      fullWidth
                                      
                                  />
                              </Grid>
                            
            
         

                            <Grid xs={12}  item>

                            {!loading?
                                <Button id ="" sx={{marginTop: 2}} type="submit" variant="contained" color="primary" fullWidth >{buttonText}</Button> 
                                  :
                                <Button id ="" sx={{marginTop: 2}} type="submit" variant="contained" disabled  fullWidth>Aguarde...</Button>     
                            }   
                            </Grid>
                            
                            
                            {error && <Message  message={error} type="error"/> }
                        
                        </Grid>
                      </form>
                </CardContent>
            </Card>
            <Box sx={{marginTop: 2}} >
                <Typography  gutterBottom color="textSecondary" variant="body2" component="p" >
                    Já tem uma conta?   
                    <a href="/login">Entre aqui</a>
                </Typography>
            </Box>
            
        </Box>
   
           // <Button sx={{marginTop:3}} type="submit" variant='contained'>{buttonText}</Button>

  )
}

export default Register