import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import {  useForm, Controller } from "react-hook-form";
import {useMutation, useQueryClient } from 'react-query'
import axios from 'axios';


const CommentForm = ({currentUser})=>{
    const {postId} = useParams()
    
    const { handleSubmit, control } = useForm();
    const queryClient = useQueryClient();

    const postComment = async(comment)=>{
        return await axios.post(`http://localhost:5000/api/post/${postId}/comment`, comment, {
            mode: 'cors',
            headers:{
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
    }

    const postCommentMutation = useMutation(postComment, {
        onSuccess: ()=>{
            queryClient.invalidateQueries('comment')
        },
        onError: ()=>{
            Swal.fire({
                title: 'Something bad happened',
                icon:'error'
            })
        }
    })
    const submit = async(data)=>{
        postCommentMutation.mutate({
            currentUserid: currentUser._id,
            body: data.comment
        })
    }

    return(
        <Box sx={{display: 'flex', justifyContent:'center', m:2}}  className="divCardCommentsPost">
                <Card sx={{display: 'flex', justifyContent:'center', minWidth: 600, flexDirection:'column'}}>

                <Controller
                        name="comment"
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'The comment does not have to be empty', 
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                            formState,
                        }) => (
                            <TextField
                                sx={{m:2}}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                id="outlined-multiline-static"
                                label="Make a comment"
                                value={value}
                                multiline
                                rows={4}
                            />
                        )}
                />               
                <Button  sx={{m:2}} variant='contained' onClick={handleSubmit(submit)}>Comment</Button>
               
                </Card>
           
        </Box>
    )
}


export default CommentForm;
