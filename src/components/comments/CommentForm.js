import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {useState} from "react";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Error from '../utils/Error';
import {  useForm, Controller } from "react-hook-form";

const CommentForm = (props)=>{
    const {postId} = useParams()
    
    const [isError, setIsError] = useState(null);
    const { handleSubmit, control } = useForm();


    const submit = async(data)=>{
        setIsError(null);
        const comment = data.comment
        
        try{
            const response = await fetch(`http://localhost:5000/api/post/${postId}/comment`,{
                method:'POST',
                mode: 'cors',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    currentUserid: props.currentUser._id,
                    body: comment
                })
            });

            const data = await response.json();
            console.log(data)
            if(data.status==='FAILED'){
                Swal.fire({
                    title: 'Something bad happened',
                    text: data.message,
                    icon:'error'
                })
            }
        }
        catch(err){
            setIsError(err);
        }
    }

    return(
        <Box sx={{display: 'flex', justifyContent:'center', m:2}}  className="divCardCommentsPost">
            {isError? (<Error error={isError}/>) : (null)}
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
