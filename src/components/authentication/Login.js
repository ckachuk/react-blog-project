import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
  
const Login = (props)=>{

    return(
        <Box className="divLogin" sx={{ display:'flex', justifyContent:'center'}}>
            <Card sx={{ minWidth: 400, mt: 30}}>
                <CardContent  sx={{ display:'flex', justifyContent:'center', flexDirection:'column'}}>            
                    <Typography variant="h5" component="div" sx={{ m:1, flexGrow: 1 }}>
                        Login
                    </Typography>
                    <TextField id="outlined-basic" label="username" name="username" variant="outlined" sx={{ m:1 }} onChange={props.handleInputLogin} required/>
                    <TextField id="outlined-basic" label="password" type="password" name="password" variant="outlined" sx={{ m:1 }} onChange={props.handleInputLogin} required/>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'center'}}>
                    <Button size="large" variant="outlined" sx={{color: '#262c50', borderColor:'#262c50'}} onClick={props.handleSubmitLogin}>Login</Button>
                </CardActions>
            </Card>
        </Box>
    )
}


export default Login;