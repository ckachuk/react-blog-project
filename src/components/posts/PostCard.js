import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const PostCard = (props)=>{
    const url = `/${props.post._id}`
    return(
        <Box className="divPost" sx={{ display: 'flex', justifyContent: 'center'}}>
            <Card sx={{display: 'flex', justifyContent: 'center',minWidth: 700, m: 5 }}>
                <CardActions sx={{ display: 'flex', justifyContent:'center', flexDirection:'column'}}>
                    <Link to={url}><Button size="large"  sx={{color:'#262c50'}}>{props.post.title}</Button></Link>
                    <Stack direction="row" spacing={1}>
                        {props.post.category ? props.post.category.map((cat)=>{
                            return <Chip label={cat.name} color="primary" key={cat._id}/>
                        }): (null)}
                    </Stack>
                </CardActions>
            </Card>
        </Box>
    )
}


export default PostCard;