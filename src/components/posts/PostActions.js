import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import Error from '../utils/Error';
import {useState} from "react";
import PublishIcon from '@mui/icons-material/Publish';
import Fab from '@mui/material/Fab';

function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}

const PostActions = (props)=>{

    const currentUser = props.currentUser != null ? props.currentUser._id : false;
    const isAdmin = props.userCredentials? props.userCredentials.isAdmin: false;
    const isAuthorPost = currentUser === props.post.user;
    const isUnpublish = props.post.publish === false ? true : false;
    const [isError, setIsError] = useState(null);

    console.log(props.post.category)
    const handleDelete = async(e)=>{
        e.preventDefault();
        setIsError(null);
        const responseSwal = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true
        })

        if(responseSwal.isConfirmed){
            try{
                const response = await fetch(`http://localhost:5000/api/post/${props.post._id}`, {
                    method: 'DELETE',
                    mode:'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        currentUserid: currentUser
                    })
                })
        
                const data = response.json();
        
                if(data.status === 'FAILED'){
                   
                    Swal.fire({
                        title: 'Something bad happened',
                        icon:'error'
                    })
                }
                else{
                    Swal.fire({
                        title: 'Post deleted',
                        message: data.message,
                        icon: 'success'
                    }).then((value)=>{
                        isUnpublish ? window.location.href = '/posts/unpublish' : window.location.href = '/'
                        
                    })
                }
            }catch(err){
                setIsError(err);
            } 
        }
    }
    
    const handlePublish = async(e)=>{        
        setIsError(null);
        const getCategoriesId = props.post.category.map((technology)=>{
            return technology._id
        });

        const responseSwal = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true
        })

        if(responseSwal.isConfirmed){
            try{
                const response = await fetch(`http://localhost:5000/api/post/${props.post._id}`,{
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        title: props.post.title,
                        body: decodeEntity(props.post.body),
                        currentUserid: props.post.user,
                        date_created: props.post.date_created,
                        category: getCategoriesId,
                        publish: true
                    })
                });

                const data = await response.json();

                if(data.status=== 'OK'){
                    Swal.fire({
                        title: 'Post publish',
                        message: data.message,
                        icon: 'success'
                    }).then((value)=>{
                        window.location.href = '/';
                    })
                }
                else{
                    Swal.fire({
                        title: 'Something bad happened',
                        icon:'error'
                    })
                }
            }catch(err){
                setIsError(err);
            }
        }
    }

    const urlEdit = `/post/${props.post._id}`
    const buttonDelete =  isAdmin || isAuthorPost? (<Fab onClick={handleDelete} size="small" color="primary" sx={{m:1}}><DeleteForeverIcon/></Fab>): (null);
    const buttonEdit = isAuthorPost ? (<Link to={urlEdit}><Fab size="small" color="primary" sx={{m:1}}><EditIcon/></Fab></Link>): (null);
    const buttonPublish = isUnpublish ? (<Fab onClick={handlePublish} size="small" color="primary" sx={{m:1}}><PublishIcon/></Fab>): (null);

    
    return(
        <>
            {isAdmin || isAuthorPost?  
            (<Box className='divPostActions' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {isError? (<Error error={isError}/>) : (null)}
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