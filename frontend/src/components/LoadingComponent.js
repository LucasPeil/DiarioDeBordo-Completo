import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Stack } from "@mui/material"
import { ExportedDrawerWidth } from './Navbar/Navbar';

const LoadingComponent = () => {
    const centralizePostsBox = ExportedDrawerWidth/2
  return (
    <Box sx={{width: { sm: `calc(100% - ${ExportedDrawerWidth}px)`, position:"relative"}, marginLeft:{ sm:`${centralizePostsBox}px`} ,marginTop:9}}>
        <Box sx={{ height:{xs:250}, display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Stack sx={{}} direction="row"  spacing={1} alignItems="center" justifyContent="center">
            <CircularProgress />
        </Stack>
        </Box>
    
  </Box>
 
  )
}

export default LoadingComponent