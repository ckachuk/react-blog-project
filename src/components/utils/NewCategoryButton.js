import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



const NewCategoryButton = (props)=>{

    const isAdmin = props.userCredentials !=null ?  props.userCredentials.isAdmin : false
    const newCategoryButton = isAdmin ? (<Button onClick={props.handleOpen} variant="contained" sx={{color: 'white'}}>New category</Button>): (null) 
    return(
        
        <Box sx={{display:'flex', justifyContent:'flex-end', m: 4}}>
            {newCategoryButton}
        </Box>
    )

}


export default NewCategoryButton;