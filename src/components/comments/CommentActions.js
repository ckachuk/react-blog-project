import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import {useMutation, useQueryClient } from 'react-query'
import axios from 'axios';

const CommentActions = ({comment, userCredentials, currentUser})=>{
    const {postId} = useParams()
   
    const isAdmin = userCredentials ? userCredentials.isAdmin : false;
    const isAuthorComment = currentUser._id === comment.user._id;
    const queryClient = useQueryClient();

    const deleteComment = async()=>{
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/post/${postId}/comment/${comment._id}`,
        {   
            data: {currentUserid: currentUser._id},
            mode:'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    const deleteCommentMutation = useMutation(deleteComment, {
        onSuccess: ()=>{
            queryClient.invalidateQueries();
            Swal.fire({
                title: 'Comment deleted',
                icon:'success'
            })
        },
        onError: ()=>{
            Swal.fire({
                title: 'Something wrong happened',
                icon:'error'
            })
        }
    })

    const handleDelete = async(e)=>{
        e.preventDefault()
        const responseSwal = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true
        })

        if(responseSwal.isConfirmed){
           console.log(currentUser._id)
            deleteCommentMutation.mutate()
        }
    }

    return(
        <>
            {isAdmin || isAuthorComment? 
            (<Box className='divPostActions' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', m:3}}>
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
