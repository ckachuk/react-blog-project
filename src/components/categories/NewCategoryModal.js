import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #262c50',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
};

const NewCategoryModal = (props)=>{

    return(
        <Box>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Card sx={{ display: 'flex', justifyContent:'center', flexDirection:'column', minWidth: 300, m:5 }}>
                        <CardContent sx={{ display:'flex', justifyContent:'center', flexDirection:'column'}}>            
                            <Typography variant="h5" component="div" sx={{ m:1 }}>
                                Create a new category
                            </Typography>
                            <TextField id="outlined-basic" label="Name" name="name" onChange={props.handleInputCategory} variant="outlined" sx={{ m:1 }} required/>
                        </CardContent>
                        <CardActions sx={{display:'flex', justifyContent:'center'}}>
                            <Button size="large" variant="outlined" sx={{color: '#262c50', borderColor:'#262c50'}} onClick={props.handleSubmitCategory}>Create</Button>
                        </CardActions>
                    </Card>
                </Box>
            </Modal>
        </Box>
    )
}

export default NewCategoryModal;