import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react"
import Posts from '../posts/Posts';
import Error from '../utils/Error';

const CategoryPosts = (props)=>{
    const {categoryId}= useParams()

    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(null);

    useEffect(()=>{
        const getAllPostsOfCategory = async()=>{
            setIsError(null);
            try{
                const response = await fetch(`http://localhost:5000/api/category/${categoryId}`);

                const data = await response.json();
    
                if(data.status ==='OK'){
                    setPosts(data.posts)
                }
            }catch(err){
                setIsError(err);
            }
        }
        getAllPostsOfCategory();
    })


    return(
        <Box className="divCategory" sx={{ display: 'flex', justifyContent: 'center'}}>
            {isError ? (<Error error={isError}/>) : (null)}
            <Posts posts={posts}/>
        </Box>
    )
}


export default CategoryPosts;