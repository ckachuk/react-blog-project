import Box from '@mui/material/Box';
import PostCard from './PostCard';
import Typography from '@mui/material/Typography';
import PostActions from './PostActions'
import IsEmpty from '../utils/IsEmpty';
import NewPostButton from '../utils/NewPostButton'

const Posts = (props)=>{
    
    return(
        <Box>
            <NewPostButton userCredentials={props.userCredentials}/>
            <Typography variant="h5"  sx={{ display:'flex', justifyContent:'center', m:4 }}>Projects</Typography>
            {props.posts? props.posts.map((post)=>{
                return (
                <Box sx={{display:'flex', justifyContent:'center'}} key={post._id}>
                    <PostCard post={post}/>
                    <PostActions userCredentials={props.userCredentials} currentUser={props.currentUser}  post={post}/>
                </Box>)
            }): (<IsEmpty />)}
        </Box>
    )
}


export default Posts;