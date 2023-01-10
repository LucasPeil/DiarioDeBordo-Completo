
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AddBoxIcon from '@mui/icons-material/AddBox';
import FolderSharedIcon from '@mui/icons-material/FolderShared';

export const navbarMainItens = [

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