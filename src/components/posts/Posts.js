import Box from '@mui/material/Box';
import PostCard from './PostCard';
import Typography from '@mui/material/Typography';
import IsEmpty from '../utils/IsEmpty';
import NewPostButton from '../utils/NewPostButton'
import PostActions from './PostActions'

const Posts = (props)=>{
    
    return(
        <Box>
            <NewPostButton userCredentials={props.userCredentials}/>
            <Typography variant="h5"  sx={{ display:'flex', justifyContent:'center', mr:100, mb:4 }}>Projects</Typography>
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