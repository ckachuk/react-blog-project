
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import {useState} from "react"
import Swal from 'sweetalert2';
import { FormInputText } from '../utils/form-components/FormInputText';
import { useForm } from "react-hook-form";
import axios from 'axios';
import {useMutation, useQueryClient } from 'react-query'



const BecomeAuthor = ({currentUser, userCredentials})=>{
    const queryClient = useQueryClient();

    const {control, handleSubmit} = useForm()
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const postBecomeAuthor = async(key)=>{
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/privilege/author`, key,{
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    const becomeAuthorMutation = useMutation(postBecomeAuthor, {
        onSuccess: (response)=>{
            queryClient.invalidateQueries()
            if(response.data.message === 'Key is incorrect'){
                Swal.fire({
                    title: 'The key is incorrect',
                    icon: 'error'
                })
                
            }else{
                Swal.fire({
                    title: 'You became author',
                    icon: 'success'
                }).then((value)=>{
                    window.location.href = '/';
                })
            }
            
        },
        onError: ()=>{
            Swal.fire({
                title: 'Something wrong happened',
                icon: 'error'
            })
        }
    })
  
    const submitKeyAuthor = async(key)=>{
       becomeAuthorMutation.mutate({key: key.author, currentUserid: currentUser._id});
       handleClose();
    }

    const isAuthor =  userCredentials? userCredentials.isAuthor: false ;

    const becomeAuthorButton = isAuthor? (null) : (<Button sx={{color: 'white'}} onClick={handleOpen}>Become author</Button>);
    return(
        <>
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
            <Card sx={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: 600, 
                        m:5 }}>
                <CardContent sx={{ display:'flex', justifyContent:'center', flexDirection:'column'}}>            
                        <Typography variant="h5" component="div" sx={{ m:1 }}>
                            Become author
                        </Typography>
                        <FormInputText name='author' control={control} label="Key author"/>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'center'}}>
                        <Button size="large" variant="outlined" sx={{color: '#262c50', borderColor:'#262c50'}} onClick={handleSubmit(submitKeyAuthor)}>ENTER</Button>
                </CardActions>
            </Card>
               
            </Modal>
            {becomeAuthorButton}
        </>
    )
}



export default BecomeAuthor;