

import React from 'react'
import { Box, Stack,Typography } from "@mui/material"
import { ExportedDrawerWidth } from '../Navbar/Navbar';

const NoPosts = () => {
    const centralizePostsBox = ExportedDrawerWidth/2
    
  return (

    <Box sx={{width: { sm: `calc(100% - ${ExportedDrawerWidth}px)`, position:"relative"}, marginLeft:{ sm:`${centralizePostsBox}px`} ,marginTop:9}}>
       
    <Box sx={{ height:{xs:250}, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Stack sx={{}} direction="row"  spacing={1} alignItems="center" justifyContent="center">

             <Typography  variant="overline" gutterBottom color="textSecondary">Você ainda não criou sem primeiro post</Typography>
                   
        </Stack>
    </Box>
</Box>
  )
}

export default NoPosts