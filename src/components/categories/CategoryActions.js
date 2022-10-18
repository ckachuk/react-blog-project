import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Swal from 'sweetalert2';
import Fab from '@mui/material/Fab';
import axios from 'axios';
import {useMutation, useQueryClient } from 'react-query'

const CategoryActions = ({currentUser, userCredentials, category})=>{

    const queryClient = useQueryClient()
    const currentUserid = currentUser != null ? currentUser._id : false;
    const isAdmin = userCredentials? userCredentials.isAdmin: false;

    const deleteCategory = async()=>{
        return await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/category/${category._id}`,{
            mode:'cors',
            headers:{
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })
        
    }

    const deleteCategoryMutation = useMutation(deleteCategory, {
        onSuccess: ()=>{
            queryClient.invalidateQueries()
            Swal.fire({
                title: 'Category deleted',
                icon: 'success'
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
            deleteCategoryMutation.mutate({currentUserid:currentUserid}) 
        }
    }

    return(
        <>
            {isAdmin ? 
            (<Box className='divPostActions' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Card>
                    <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                        <Fab onClick={handleDelete} size="small" color="primary" sx={{m:1}}><DeleteForeverIcon/></Fab>
                    </CardActions>  
                </Card>
            </Box>): (null)}
        </>
      
    )
}


export default CategoryActions;