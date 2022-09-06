import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useParams } from "react-router-dom";
import TextField from '@mui/material/TextField';
import {useState} from "react";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import Error from '../utils/Error';

const CommentForm = (props)=>{
    const {postId} = useParams()
    
    const [comment, setComment] = useState({});
    const [isError, setIsError] = useState(null);

    const handleInput = (e)=>{
        e.preventDefault();
        setComment(e.target.value);
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setIsError(null);
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
                <TextField
                    sx={{m:2}}
                    id="outlined-multiline-static"
                    label="Make a comment"
                    multiline
                    onChange={handleInput}
                    rows={4}
    
                />
                <Button  sx={{m:2}} variant='contained' onClick={handleSubmit}>Comment</Button>
            </Card>
        </Box>
    )
}


export default CommentForm;
