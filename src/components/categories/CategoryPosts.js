import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import Posts from '../posts/Posts';
import Error from '../utils/Error';
import IsEmpty from '../utils/IsEmpty';
import {useQuery } from 'react-query';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const CategoryPosts = ()=>{
    const {categoryId}= useParams()
    const {loading, error, data: dataPosts} = useQuery('posts', async()=>{
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/category/${categoryId}`)
        return response.data
    })

    return(
        <Box className="divCategory" sx={{ display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
            {error ? (<Error error={error}/>) : (null)}
            {loading? <CircularProgress/> : (null)}
            
            {dataPosts !== undefined ? <Posts posts={dataPosts.posts}/> : (null)}
            {dataPosts.posts.length === 0 ? (<><IsEmpty/></>): null }
        </Box>
    )
}


export default CategoryPosts;