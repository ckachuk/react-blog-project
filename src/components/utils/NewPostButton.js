import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const NewPostButton = (props)=>{

    const isAuthor = props.userCredentials !=null ?  props.userCredentials.isAuthor : false
    const newPostButton = isAuthor ? (<Link to='/post'><Button variant="contained" sx={{color: 'white'}}>New Post</Button></Link>): (null) 
    return(
        <Box sx={{display:'flex', justifyContent:'flex-end', m: 4}}>
            {newPostButton}
        </Box>
    )

}


export default NewPostButton;