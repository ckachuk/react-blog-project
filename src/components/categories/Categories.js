import Box from '@mui/material/Box';
import Category from './Category';
import Typography from '@mui/material/Typography';
import {useState} from "react"
import NewCategoryButton from '../utils/NewCategoryButton'
import Swal from 'sweetalert2';
import NewCategoryModal from './NewCategoryModal';
import IsEmpty from '../utils/IsEmpty';
import CategoryActions from './CategoryActions';
import Error from '../utils/Error';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import {useQuery,useMutation, useQueryClient } from 'react-query'

const Categories = ({currentUser, userCredentials})=>{

    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {loading, error, data:dataCategories } = useQuery('dataCategories', async()=>{
        const response =  await axios.get('http://localhost:5000/api/categories')
        return response.data
    })

    const postCategory = async(category)=>{
        return await axios.post('http://localhost:5000/api/category', category,
        {
            mode: 'cors',
            headers:{
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        })

    }

    const addCategoryMutation = useMutation(postCategory, {
        onSuccess:()=>{
            queryClient.invalidateQueries('dataCategories')
            Swal.fire({
                icon: 'success',
                title: 'The category has been created'
              })
        },
        onError:()=>{
            Swal.fire({
                icon: 'error',
                title: 'Something wrong happened'
            })
        }
        
    })      

    const submitCategory = async(dataForm)=>{
        addCategoryMutation.mutate({name: dataForm.category, currentUserid: currentUser._id})
        handleClose();
    }

    return(
        <Box className="divCategories">
            <NewCategoryButton userCredentials={userCredentials} handleOpen={handleOpen}/>
            <NewCategoryModal open={open}  handleClose={handleClose} submitCategory={submitCategory}/>
            <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', m:4}}>Technologies</Typography>
            {loading? <CircularProgress/>: (null)}
            {error? <Error error={error}/> : (null)}
            {dataCategories !== undefined? dataCategories.categories.map((category)=>{
                return(<Box sx={{display:'flex', justifyContent:'center'}} key={category._id}>
                    <Category category={category}/>
                    <CategoryActions currentUser={currentUser} userCredentials={userCredentials} category={category}/>
                    </Box>)
            }) : <IsEmpty />}
        </Box>
    )
}


export default Categories;