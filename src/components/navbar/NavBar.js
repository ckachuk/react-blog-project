import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import BecomeAuthor from '../privilege/BecomeAuthor';



const NavBarLogged = (props)=>{
   
    const isAuthor = props.userCredentials !=null? props.userCredentials.isAuthor: false

    const unpublishButton = isAuthor? (<Link to='/posts/unpublish'><Button sx={{color: 'white'}}>Unpublish</Button></Link>): (<BecomeAuthor currentUser={props.currentUser} userCredentials={props.userCredentials} />);

    return(
        <Box>
            <Link to='/categories'><Button sx={{color: 'white'}} >Categories</Button></Link>
            {unpublishButton}
            <Link to='/'><Button sx={{color: 'white'}} onClick={props.handleLogout}>Logout</Button></Link>
        </Box>
    )
}

const NavBarWithoutLogin = (props)=>{
    return(
        <Box>
            <Link to='/login'><Button sx={{color: 'white'}}>Login</Button></Link>
            <Link to='/signup'><Button sx={{color: 'white'}}>Sign up</Button></Link>
        </Box>
    )
}

const NavBar = (props)=>{
    return(
        <Box sx={{ flexGrow: 1 }} className='div-navbar'>
            <AppBar position="static">
                <Toolbar sx={{backgroundColor: '#262c50'}}>  
                    <Box sx={{flexGrow:1}}>
                        <Link to='/' ><Button sx={{color: 'white'}} >GitHub projects blog</Button></Link>
                    </Box>         
                    {props.currentUser? (<NavBarLogged currentUser={props.currentUser} userCredentials={props.userCredentials} handleLogout={props.handleLogout}/>): (<NavBarWithoutLogin/>)}
                </Toolbar>
            </AppBar>
        </Box>
   
    )
}


export default NavBar;