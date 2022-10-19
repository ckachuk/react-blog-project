import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import PublishIcon from '@mui/icons-material/Publish';
import Fab from '@mui/material/Fab';
import {useMutation, useQueryClient } from 'react-query'
import axios from 'axios';
import {  useNavigate } from "react-router-dom";


function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}


const PostActions = ({currentUser, userCredentials, post})=>{
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const currentUserid = currentUser != null ? currentUser._id : false;
    const isAdmin = userCredentials? userCredentials.isAdmin: false;
    const isAuthorPost = currentUserid === post.user;
    const isUnpublish = post.publish === false ? true : false;
    
    const postPublish = async(data)=>{
        return await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/post/${post._id}`, data, {
            mode: 'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            },
        })
    }

    const postPublishMutation = useMutation(postPublish,{
        onSuccess:()=>{
            queryClient.invalidateQueries('dataPost');
            Swal.fire({
                title: 'Post publish',
                icon: 'success'
            }).then((value)=>{
                window.location.href = '/';
            })
        },
        onError: ()=>{
            Swal.fire({
                title: 'Something bad happened',
                icon:'error'
            })
        }
    })


    const deletePost = async()=>{
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/post/${post._id}`,{
            mode:'cors',
            headers: {
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
    }
    const deletePostMutation = useMutation(deletePost, {
        onSuccess: ()=>{
            queryClient.invalidateQueries()
            Swal.fire({
                title: 'Post deleted',
                message: 'The post has been deleted',
                icon: 'success'
            }).then((value)=>{
                isUnpublish ?  navigate('/posts/unpublish') :  navigate('/')    
            })
        },
        onError: ()=>{
            Swal.fire({
                title: 'Something bad happened',
                icon:'error'
            })
        }
    })

    const handleDelete = async(e)=>{
        e.preventDefault();
        
        const responseSwal = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true
        })

        if(responseSwal.isConfirmed){
            deletePostMutation.mutate({currentUserid: currentUser._id})
        }
    }
    

    const handlePublish = async(e)=>{        
        
        const getCategoriesId = post.category.map((technology)=>{
            return technology._id
        });

        const responseSwal = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true
        })

        if(responseSwal.isConfirmed){
            postPublishMutation.mutate({
                title: post.title,
                body: decodeEntity(post.body),
                currentUserid: post.user,
                date_created: post.date_created,
                category: getCategoriesId,
                publish: true
            })
        }
    }

    const urlEdit = `/post/${post._id}`
    const buttonDelete =  isAdmin || isAuthorPost? (<Fab onClick={handleDelete} size="small" color="primary" sx={{m:1}}><DeleteForeverIcon/></Fab>): (null);
    const buttonEdit = isAuthorPost ? (<Link to={urlEdit}><Fab size="small" color="primary" sx={{m:1}}><EditIcon/></Fab></Link>): (null);
    const buttonPublish = isUnpublish ? (<Fab onClick={handlePublish} size="small" color="primary" sx={{m:1}}><PublishIcon/></Fab>): (null);

    
    return(
        <>
            {isAdmin || isAuthorPost?  
            (<Box className='divPostActions' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Card>
                    <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        {buttonEdit}
                        {buttonDelete}
                        {buttonPublish}
                    </CardActions>  
                </Card>
            </Box>): (null)}
        </>
    )
}


export default PostActions;