import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CommentForm from './CommentForm';
import Comment from './Comment'
import CommentActions from './CommentActions';
import IsEmpty from '../utils/IsEmpty'

const Comments = ({comments, userCredentials, currentUser})=>{
    
    const commentsArray = comments.length !== 0 ? comments : false  

    return(
        <Box sx={{display: 'flex', justifyContent:'center', flexDirection: 'column' }}  className="divCommentsPost">
            <Box sx={{display: 'flex', justifyContent:'center', mr:60, mb:5}}>
                <Typography variant='h5'>Comments</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent:'center'}}  className="divCardCommentsPost">
                <Card sx={{display: 'flex', justifyContent:'center', flexDirection:'column', maxWidth: 700}}>
                    {commentsArray  ? commentsArray.map((comment, index)=>{
                        return (
                        <Box sx={{display:'flex', justifyContent:'center'}} key={index}>
                            <Comment comment={comment}/>
                            <CommentActions userCredentials={userCredentials} comment={comment} currentUser={currentUser} />
                        </Box>)
                    }): (<IsEmpty/>)}
                    
                </Card>
            </Box>   
            {currentUser ? (<CommentForm currentUser={currentUser}/>):(null)}
        </Box>
    )
}


export default Comments;
