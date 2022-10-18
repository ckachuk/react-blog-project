import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import {useState} from "react";
import Error from '../utils/Error';

const SignUp = (props)=>{

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [isError, setIsError] = useState(null);

    const handleInputSignUp = (e)=>{
        e.preventDefault();
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmitSignUp = async(e)=>{
        e.preventDefault();
        setIsError(null);

        if(newUser.password === newUser.confirmPassword){
            try{
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/signup`, {
                    method: 'POST', 
                    mode: 'cors',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: newUser.username,
                        password: newUser.password
                    })
                });
    
                const data = await response.json();
                if(data.status === 'OK'){
                    Swal.fire({
                        title: 'Suceess',
                        text: 'User has been created',
                        icon: 'success'
                    }).then((value)=>{
                        window.location.href = '/';
                    })   
                }
                else{
                    Swal.fire({
                        title: 'Something goes wrong',
                        text: data.message,
                        icon: 'error'
                    })
                }
            }catch(err){
                setIsError(err);
            }  
        }
        else{
            Swal.fire({
                title: 'Something goes wrong',
                text: 'Passwords do not match',
                icon: 'error'
            })
        }
    }

    return(
        <Box className="divSignUp" sx={{ display:'flex', justifyContent:'center'}}>
            {isError? <Error error={isError}/> : (null)}
            <Card sx={{ minWidth: 400, m: 10}}>
                <CardContent  sx={{ display:'flex', justifyContent:'center', flexDirection:'column'}}>            
                    <Typography variant="h5" component="div" sx={{ m:1, flexGrow: 1 }}>
                        SignUp
                    </Typography>
                    <TextField id="outlined-basic" label="username" name="username" variant="outlined" sx={{ m:1 }} onChange={handleInputSignUp} required/>
                    <TextField id="outlined-basic" label="password" type="password" name="password" variant="outlined" sx={{ m:1 }} onChange={handleInputSignUp} required/>
                    <TextField id="outlined-basic" label="confirm password" type="password" name="confirmPassword" variant="outlined" onChange={handleInputSignUp} sx={{ m:1 }} required/>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'center'}}>
                    <Button size="large" variant="outlined" sx={{color: '#262c50', borderColor:'#262c50'}} onClick={handleSubmitSignUp}>Create</Button>
                </CardActions>
            </Card>
        </Box>
    )
}


export default SignUp;