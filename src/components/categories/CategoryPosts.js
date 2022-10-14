import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import Posts from '../posts/Posts';
import Error from '../utils/Error';
import IsEmpty from '../utils/IsEmpty';
import Typography from '@mui/material/Typography';
import {useQuery } from 'react-query';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const CategoryPosts = ()=>{
    const {categoryId}= useParams()

    const {loading, error, data: dataPosts} = useQuery('posts', async()=>{
        const response = await axios.get(`http://localhost:5000/api/category/${categoryId}`)
        return response.data
    })


    return(
        <Box className="divCategory" sx={{ display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
            {error ? (<Error error={error}/>) : (null)}
            {loading? <CircularProgress/> : (null)}
            {dataPosts.posts.length > 0 ? <Posts posts={dataPosts.posts}/> :
             (<>
                <Typography variant="h5"  sx={{ display:'flex', justifyContent:'center', mr:100, mb:4, mt:6 }}>Projects</Typography>
                <IsEmpty/>
             </>)}
        </Box>
    )
}


export default CategoryPosts;