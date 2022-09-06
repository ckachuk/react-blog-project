import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import {useState} from "react"
import Swal from 'sweetalert2';
import Error from '../utils/Error';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #262c50',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
  };

const BecomeAuthor = (props)=>{

    const [open, setOpen] = useState(false);
    const [keyInput, setKeyInput]= useState();
    const [isError, setIsError] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    

  
    const handleSubmitKeyAuthor = async(e)=>{
        e.preventDefault();
        setIsError(null);
        try{
            const response = await fetch('http://localhost:5000/api/privilege/author', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    key: keyInput,
                    currentUserid: props.currentUser._id
                })
            });

            const data = await response.json();
            
            handleClose();

            if(data.status === 'OK'){
                Swal.fire({
                    title: 'You became author',
                    icon: 'success'
                }).then((value)=>{
                    window.location.href = '/';
                })
            }else{
                Swal.fire({
                    title: 'The key is incorrect',
                    icon: 'error'
                })
            }
        }catch(err){
            setIsError(err);
        }
    }

    const isAuthor =  props.userCredentials? props.userCredentials.isAuthor: false ;

    const becomeAuthorButton = isAuthor? (null) : (<Button sx={{color: 'white'}} onClick={handleOpen}>Become author</Button>);
    return(
        <>
            {isError? <Error error={isError}/> : (null)}
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Card sx={{ minWidth: 300, m:5 }}>
                        <CardContent sx={{ display:'flex', justifyContent:'center', flexDirection:'column'}}>            
                            <Typography variant="h5" component="div" sx={{ m:1 }}>
                                Become author
                            </Typography>
                            <TextField id="outlined-basic" label="Key author" name="author"  variant="outlined" onChange={(e)=> setKeyInput(e.target.value)} sx={{ m:1 }} required/>
                        </CardContent>
                        <CardActions sx={{display:'flex', justifyContent:'center'}}>
                            <Button size="large" variant="outlined" sx={{color: '#262c50', borderColor:'#262c50'}} onClick={handleSubmitKeyAuthor}>ENTER</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
            {becomeAuthorButton}
        </>
    )
}



export default BecomeAuthor;