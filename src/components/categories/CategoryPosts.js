import Box from '@mui/material/Box';
import { useParams } from "react-router-dom";
import {useState, useEffect} from "react"
import Posts from '../posts/Posts';
import Error from '../utils/Error';
import IsEmpty from '../utils/IsEmpty';
import Typography from '@mui/material/Typography';

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
        <Box className="divCategory" sx={{ display: 'flex', justifyContent: 'center', flexDirection:'column'}}>
            {isError ? (<Error error={isError}/>) : (null)}
            <Typography variant="h5"  sx={{ display:'flex', justifyContent:'center', mr:100, mb:4, mt:6 }}>Projects</Typography>
            {props.posts? <Posts posts={posts}/> : <IsEmpty/>}
        </Box>
    )
}


export default CategoryPosts;