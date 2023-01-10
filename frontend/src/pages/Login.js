import React, { useEffect } from "react"
import {Button, Card, CardContent, Box, Grid, TextField, Typography} from "@mui/material"

import {useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import { login,reset } from "../slices/authSlice"
import Message from "../components/Message/Message"
const Login = () =>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const {loading, error:authError} = useSelector((state) => state.auth)
    const button = document.getElementById("submitButton")

    const handleSubmit = (e)=>{
        e.preventDefault()
        const user = {email,password}
        //console.log(user)
        dispatch(login(user))
        setEmail("")
        setPassword("")
    }
    useEffect(()=>{
        dispatch(reset())
    }, [dispatch])
    return(
        <Box style={{marginTop: "8em"}} display="flex" flexDirection="column" justifyContent="end" alignItems="center">
            
            <Card style={{maxWidth:500, padding:"1em 2em"}}>
                <Typography gutterBottom variant ="h4" align="center"> 
                    Login
                </Typography>

                <CardContent>
                    <Typography gutterBottom color="textSecondary" variant="body2" component="p" > 
                        Faça o Login na sua conta para compartilhar sua experiência
                    </Typography>
                  <form noValidate autoComplete="off" onSubmit = {handleSubmit} >
                    <Grid container spacing={1} >
                            <Grid xs={12}  item>
                                <TextField
                                    type="email"
                                    onChange={(e)=> setEmail(e.target.value)}
                                    sx={{marginTop: 2}}
                                    variant = "outlined"
                                    label= "Email"
                                    placeholder="E-mail"
                                    value={email}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid xs={12}  item>
                                <TextField
                                    type="password"
                                    onChange={(e)=> setPassword(e.target.value)}
                                    sx={{marginTop: 2}}
                                    variant = "outlined"
                                    label= "Senha"
                                    placeholder="Senha"
                                    value={password}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid xs={12}  item>

                            {!loading?
                                <Button id ="" sx={{marginTop: 2}} type="submit" variant="contained" color="primary" fullWidth >Entrar</Button>
                                    :
                                <Button id ="" sx={{marginTop: 2}} type="submit" variant="contained" disabled  fullWidth>Aguarde...</Button>     
                            } 
                               {authError && 
                                <Message  message={authError} type="error"/>}
                                
                            </Grid>
                    
                        
                        </Grid>
                      </form>
                </CardContent>
            </Card>
            <Box sx={{marginTop: 2}} >
                <Typography  gutterBottom color="textSecondary" variant="body2" component="p" >
                    Não tem cadastro? 
                    <a href="/register">Cadaste-se aqui</a>
                </Typography>
            </Box>
            
        </Box>
            
        
    )
}

export default Login