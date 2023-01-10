import React from 'react'
import { Box, Button, Stack, Grid, Modal, Divider, Typography, Container } from "@mui/material"
import {getUserById} from "../../slices/userSlice"
import { ExportedDrawerWidth } from "../Navbar/Navbar"
import { Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from "react"
import { useParams } from 'react-router-dom'

const ProfileInfo = () => {
    const {id} = useParams()
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUserById(id))
        
    },[dispatch])
    const { user } = useSelector((state) => state.user);
    

    return (
        <Box sx={{ width: { sm: `calc(100% - ${ExportedDrawerWidth}px)` }, marginLeft: { sm: `${ExportedDrawerWidth}px` } }}>
            <Box sx={{ height: { xs: 330 } }}>
                <Stack sx={{}} direction="row" spacing={1} alignItems="center" justifyContent="center">

                    <Avatar className="pefrilImage" sx={{ width: 190, height: 190, marginRight: 3 }} alt="Foto do usuário" src={user.profileImage ? user.profileImage : ""} />

                    <Box sx={{ textAlign: "start" }}>
                        <Stack direction="row" justifyContent="space-between" >
                            <Typography variant="h5" component="h2"> {user.name}</Typography>
                        </Stack>

                        <Typography sx={{}} color="textSecondary" variant="body2"> {user.username}</Typography>
                        <Typography sx={{ marginTop: 2 }} color="textSecondary"> {user.bio}</Typography>


                    </Box>
                </Stack>
            </Box>
            <Container> <Divider /></Container>

        </Box>
    )
}

export default ProfileInfo