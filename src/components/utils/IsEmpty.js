import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import InfoIcon from '@mui/icons-material/Info';

const IsEmpty = (props)=>{

    return(
        <Box sx={{display:'flex', justifyContent:'center'}}>
            <Card sx={{display:'flex', justifyContent:'center', minWidth:700, minHeight:70, alignItems:'center'}}>
                <InfoIcon sx={{mr:1}} color='primary' fontSize='large'/>
                <Typography >There are no entries</Typography>
            </Card>
        </Box>
    )
}

export default IsEmpty;

