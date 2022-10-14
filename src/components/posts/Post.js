import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Comments from '../comments/Comments';
import {useQuery } from 'react-query'
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Error from '../utils/Error';

const Post = ({currentUser, userCredentials})=>{
    const {postId} = useParams();

  
    const {loading, error, data: dataPost } = useQuery('dataPost', async()=>{
        const response = await axios.get(`http://localhost:5000/api/post/${postId}`);
        return response.data;
    })

    function decodeEntity(inputStr) {
        var textarea = document.createElement("textarea");
        textarea.innerHTML = inputStr;
        return textarea.value;
    }

    const dataBody = dataPost ? decodeEntity(dataPost.post.body): (null);
    
    return(
        <Box sx={{display: 'flex', justifyContent:'center'}}>
            {loading? <CircularProgress/>: (null)}
            {error? <Error error={error}/> : (null)}
            {dataPost !== undefined? 
            <Box className="divCardPost" sx={{display: 'flex', justifyContent:'center',flexDirection: 'column'}}>
                <Card sx={{display: 'flex', justifyContent:'center', minWidth: 800, mt: 5, mb:5}}>
                    
                    <CardContent sx={{m:4}}>
                        
                        <Typography variant='h3'>{dataPost.post.title}</Typography>
                        <Stack direction="row" spacing={1} sx={{m:2}}>
                            {dataPost.post.category ? dataPost.post.category.map((cat)=>{
                                return <Chip label={cat.name} color="primary" key={cat._id}/>
                            }): (null)}
                        </Stack>
                        <div dangerouslySetInnerHTML={{__html: dataBody}}/>
                        <Typography variant='body2'>Author: {dataPost.post.user ? dataPost.post.user.username: null}</Typography>
                        <Typography variant='body2'>Date post created: {dataPost.post.date_created}</Typography>
                    </CardContent>
                    
                </Card>     
                <Comments comments={dataPost.comments} currentUser={currentUser}  userCredentials={userCredentials}/>
            </Box> :(null)}
            
            
        </Box>
    )
}


export default Post;