import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Swal from 'sweetalert2';
import Error from '../utils/Error';
import {useState} from "react";
import Fab from '@mui/material/Fab';

const CategoryActions = (props)=>{

    const currentUser = props.currentUser != null ? props.currentUser._id : false;
    const isAdmin = props.userCredentials? props.userCredentials.isAdmin: false;

    const [isError, setIsError] = useState(null);

    const handleDelete = async(e)=>{
        e.preventDefault();

        const responseSwal = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true
        })

        if(responseSwal.isConfirmed){
            setIsError(null);
            try{
                const response = await fetch(`http://localhost:5000/api/category/${props.category._id}`, {
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
                        title: 'Category deleted',
                        message: data.message,
                        icon: 'success'
                    }).then((value)=>{
                        window.location.href = '/categories';
                    })
                }
            }catch(err){
                setIsError(err);
            }
        }
        
    }

    return(
        <>
            {isAdmin ? 
            (<Box className='divPostActions' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {isError ? <Error error={isError}/>:(null)}
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