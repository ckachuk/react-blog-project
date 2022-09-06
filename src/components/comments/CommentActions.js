import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import Error from '../utils/Error';
import {useState} from "react"

const CommentActions = (props)=>{
    const {postId} = useParams()
   
    const isAdmin = props.userCredentials ? props.userCredentials.isAdmin : false
    const isAuthorComment = props.currentUser === props.comment.user;
    const [isError, setIsError] = useState(null);

    const handleDelete = async(e)=>{
        e.preventDefault()

        const responseSwal = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true
        })

        if(responseSwal.isConfirmed){
            setIsError(null)
            try{
                const response = await fetch(`http://localhost:5000/api/post/${postId}/comment/${props.comment._id}`,{
                    method: 'DELETE',
                    mode:'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        currentUserid: props.currentUser._id
                    })
                });

                const data = await response.json();

                if(data.status ==='OK'){
                    Swal.fire({
                        title: 'Comment deleted',
                        text: data.message,
                        icon:'success'
                    })
                }
            }catch(err){
                setIsError(err)
            }
        }
    
    }

   
    return(
        <>
            {isAdmin || isAuthorComment? 
            (<Box className='divPostActions' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', m:3}}>
                {isError? (<Error error={isError}/>) : (null)}
                <Card>
                    <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button onClick={handleDelete}><DeleteForeverIcon/></Button>
                    </CardActions>  
                </Card>
            </Box>): (null)}
        </>
        
    )
}


export default CommentActions;
