import { useState, useEffect } from 'react'

import { NavLink, Link, useNavigate, useParams } from "react-router-dom"

import { navbarMainItens } from './NavbarItens'
import { useDispatch, useSelector } from 'react-redux'
import { useAuthorization } from '../../hooks/useAuthorization';
import { logout, reset } from '../../slices/authSlice'
import { getUserById, profile } from '../../slices/userSlice'
//import { getAllowedPosts} from '../../slices/postSlice'




//Material Ui Navbar

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Avatar, ThemeProvider } from '@mui/material';
import { uploads } from "../../utils/config"
import { resetMessage,getAllowedPosts } from '../../slices/postSlice';
import Message from '../Message/Message';


function Navbar(props) {

  const { auth } = useAuthorization()
  const { user, loading } = useSelector(state => state.user)
  const { user: userAuth } = useSelector(state => state.auth)
  const {allowedPosts, posts, loading:postLoading, error: postError} = useSelector(state=> state.post)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showProfileImageIcon, setShowProfileImageIcon] = useState(true)
  

  useEffect(() => {
    dispatch(profile())

  }, [dispatch])

  const handleClick = (label, route) => {

    if (label === "Sair") {
      dispatch(logout())
      dispatch(resetMessage())
      navigate("/login")
      

    } else if (label === "Meu Perfil") {
      
      dispatch(resetMessage())

      navigate(route)

    }else if (label === "Posts compartilhados") {
     
      navigate(route)


    }else if (label === "Nova experiência") {
      dispatch(resetMessage())
      
      navigate(route)
      

    } else {
      navigate("/")
    }
  }


  const drawerWidth = 200;
  let onClickAction = ""
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div className="borda">
      <Toolbar />
      <Divider />
      <List  >
        {navbarMainItens.map((item, index) => (

          <ListItem key={item.id} disablePadding onClick={() => handleClick(item.label, item.route)}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>


        ))}
      </List>
      <Divider />

    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;




  return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
          }}
          color="primary"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <AutoStoriesIcon className='clickable'  onClick={() => { navigate("/") }} sx={{ display: { xs: "inline" }, marginRight: 2, }} />
            <Typography  className='clickable' onClick={() => { navigate("/") }} variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "inline" } }}>
              Diário de Bordo
            </Typography>
            <Box sx={{ position: "absolute", right: "1em" }}>
              {user && 
                <Avatar className="clickable" onClick={() => { navigate("/profile") }} sx={{ width: 30, height: 30, border:"1px solid white" }} alt="Foto do usuário" src={user.profileImage? user.profileImage.url:""} />
              }
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'none', md: "block" },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
        </Box>
      </Box>
   
  );


}
export const ExportedDrawerWidth = 200
export default Navbar
