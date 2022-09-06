import Box from '@mui/material/Box';
import './App.css';
import {useEffect, useState} from "react";
import Posts from './components/posts/Posts';

function Homepage(props) {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const getPosts = async()=>{
      const response = await fetch('http://localhost:5000/api/posts/published');

      const data = await response.json();
      
      setPosts(data.posts);
    }
    getPosts();
  },[]);
  return (
    <Box className='divHomepage'>
      <Posts posts={posts} currentUser={props.currentUser} userCredentials={props.userCredentials}/>
    </Box>
  );
}

export default Homepage;
