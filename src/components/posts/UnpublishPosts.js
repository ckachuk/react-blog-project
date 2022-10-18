import Box from '@mui/material/Box';
import Posts from './Posts';
import Error from '../utils/Error';
import CircularProgress from '@mui/material/CircularProgress';
import {useQuery} from 'react-query'
import axios from 'axios';
import IsEmpty from '../utils/IsEmpty';
import NewPostButton from '../utils/NewPostButton'

const UnpublishPosts = ({currentUser, userCredentials})=>{
    
    const {loading, error, data: unpublishPosts} = useQuery('unpublishPosts', async()=>{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/posts/unpublished/${currentUser._id}`,{
            mode: 'cors',
            headers:{
              'Content-type': 'application/json',
              'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })  
        return response.data.posts
    })
 
    return(
        <Box className="divUnpublishPosts">
            
            {loading? (<CircularProgress/>) : (null)}
            {error? (<Error error={error}/>) : (null)}
            {unpublishPosts === undefined? (
            <>
                <NewPostButton userCredentials={userCredentials}/>
                <IsEmpty/>
            </>) : 
            (<Posts posts={unpublishPosts} currentUser={currentUser} userCredentials={userCredentials}/>)}
        </Box>
    )
}


export default UnpublishPosts;