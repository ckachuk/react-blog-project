import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Comments from '../comments/Comments';
import Error from '../utils/Error';

const Post = (props)=>{
    const {postId} = useParams();

    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [isError, setIsError] = useState(null);

    function decodeEntity(inputStr) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
    }

    useEffect(()=>{
        const getPost = async()=>{
            setIsError(null);
            try{
                const response = await fetch(`http://localhost:5000/api/post/${postId}`);

                const data = await response.json();
                
                setPost(data.post); 
                setComments(data.comments)
            }catch(err){
                setIsError(err);
            }
            
        }
        getPost();

    },[postId, comments]);

    const dataBody = decodeEntity(post.body);
    
    return(
        <Box sx={{display: 'flex', justifyContent:'center',flexDirection: 'column'}}>
            {isError? (<Error error={isError}/>) : (null)}
            <Box className="divCardPost" sx={{display: 'flex', justifyContent:'center'}}>
                <Card sx={{display: 'flex', justifyContent:'center', minWidth: 800, mt: 5, mb:5}}>
                    <CardContent sx={{m:4}}>
                        <Typography variant='h3'>{post.title}</Typography>
                        <Stack direction="row" spacing={1} sx={{m:2}}>
                            {post.category ? post.category.map((cat)=>{
                                return <Chip label={cat.name} color="primary" key={cat._id}/>
                            }): (null)}
                        </Stack>
                        <div dangerouslySetInnerHTML={{__html: dataBody}}/>
                        <Typography variant='body2'>Author: {post.user ? post.user.username: null}</Typography>
                        <Typography variant='body2'>Date post created: {post.date_created}</Typography>
                    </CardContent>
                </Card>     
            </Box> 
            <Comments comments={comments} currentUser={props.currentUser}  userCredentials={props.userCredentials}/>
        </Box>
    )
}


export default Post;