import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {  useForm, Controller } from "react-hook-form";

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '8px',
    boxShadow: 24,
    p: 4,
};

const NewCategoryModal = ({open, handleClose, submitCategory})=>{
    const { handleSubmit, control } = useForm();

    return(
        <Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Box sx={{display: 'flex', justifyContent:'center', flexDirection:'column'}}>
                            <Box sx={{display: 'flex', justifyContent:'center'}}>
                                <Typography variant="h5" component="div" sx={{ m:2 }}>Create a new category</Typography>
                            </Box>

                        <Controller
                        name="category"
                        control={control}
                        defaultValue=''
                        rules={{
                            required: 'The category does not have to be empty', 
                        }}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                            formState,
                        }) => (
                            <TextField 
                                sx={{m:2}}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                id="outlined-multiline-static"
                                label="Create a category"
                                value={value}
                                rows={4}
                            />

                        )}
                        />
                            <Box sx={{display: 'flex', justifyContent:'center', m:2}}>
                                <Button size="large" variant="outlined" sx={{color: '#262c50', borderColor:'#262c50', width:'50%'}} onClick={handleSubmit(submitCategory)}>Create</Button>
                            </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default NewCategoryModal;