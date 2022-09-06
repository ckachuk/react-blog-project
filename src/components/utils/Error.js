import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InfoIcon from '@mui/icons-material/Info';

const Error = (props)=>{

    return(
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Card sx={{display:'flex', justifyContent:'center', minWidth:300, minHeight:100, alignItems:'center'}}>
                <InfoIcon sx={{mr:1}} color='primary' fontSize='large'/>
                <Typography variant='h6'>Something went wrong</Typography>
                <Typography variant='body2'>{props.error}</Typography>
            </Card>
        </Box>
    )
}

export default Error;

