import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";




const NavBarLogged = (props)=>{
    const isAdmin = props.currentUser.credential.isAdmin;
    const isAuthor =  props.currentUser.credential.isAuthor; 

    const newCategoryButton = isAdmin? (<Link to='/new-category'><Button sx={{color: 'white'}}>New category</Button></Link>): (null);
    const newPostButton = isAuthor? (<Link to='/new-post'><Button sx={{color: 'white'}}>New Post</Button></Link>): (null);
    
    const becomeAuthorButton = isAuthor? (null) : (<Link to='/become-author'><Button sx={{color: 'white'}}>Become author</Button></Link>);
    return(
        <Box>
            <Link to='/categories'><Button sx={{color: 'white'}} >Categories</Button></Link>
            {becomeAuthorButton}
            <Link to='/'><Button sx={{color: 'white'}}>Logout</Button></Link>
        </Box>
    )
}

const NavBarWithoutLogin = (props)=>{
    return(
        <Box>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign up</Button>
        </Box>
    )
}

const NavBar = (props)=>{
    return(
        <Box sx={{ flexGrow: 1 }} className='div-navbar'>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: 'red'}}>       
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GitHub projects blog
                    </Typography>
                    {props.currentUser? (<NavBarLogged currentUser={props.currentUser}/>): (<NavBarWithoutLogin/>)}
                </Toolbar>
            </AppBar>
        </Box>
   
    )
}


export default NavBar;