
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useDispatch, useSelector } from 'react-redux'
import { useAuthorization } from '../../hooks/useAuthorization';
import { logout, reset } from '../../slices/authSlice'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

export const navbarMainItens = [
   // {
     //   id:0,
      //  label: "Registre-se",
       // icon: <AppRegistrationIcon/>,
       // route: "/register"

    //},

    {
            id:1,
            label: "Nova experiência",
            icon: <AddBoxIcon/>,
            route: "/"

    },
    {
        id:3,
        label: "Meu Perfil",
        icon: <LibraryBooksIcon/>,
        route:"/profile"
    },
    {
        id:4,
        label: "Posts compartilhados",
        icon: <FolderSharedIcon/>,
        route:"/allowedposts"
    },
    {
        id:2,
        label: "Sair",
        icon: <ExitToAppIcon/>,
        route:""
        
    },
    


]