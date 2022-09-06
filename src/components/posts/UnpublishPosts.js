import Box from '@mui/material/Box';
import {useEffect, useState} from "react";
import Swal from 'sweetalert2';
import Posts from './Posts';
import Error from '../utils/Error';

const UnpublishPosts = (props)=>{
    const [posts, setPosts] = useState([]);
    const [isError, setIsError] = useState(null);
    
    useEffect(()=>{
        const getAllUnpublishPosts = async()=>{
            setIsError(null);
            try{
                const response = await fetch('http://localhost:5000/api/posts/unpublished',{
                    method:'POST',
                    mode: 'cors',
                    headers:{
                      'Content-type': 'application/json',
                      'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                      currentUserid: props.currentUser._id
                    })
                })
    
                const data = await response.json();
               
                if(data.status=== 'OK'){
                    setPosts(data.posts)
                }
                else{
                    Swal.fire({
                        title: 'Something wrong ocurred',
                        icon: 'error',
                        text: data.message
                    }).then((value)=>{
                        window.location.href = '/';
                    })
                }
            }catch(err){
                setIsError(err);
            }
        }

        getAllUnpublishPosts()
    },[props.currentUser._id])

    return(
        <Box className="divUnpublishPosts">
            {isError? <Error error={isError}/> : (null)}
            <Posts posts={posts} currentUser={props.currentUser} userCredentials={props.userCredentials}/>
        </Box>
    )
}


export default UnpublishPosts;