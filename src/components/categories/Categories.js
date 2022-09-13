import Box from '@mui/material/Box';
import Category from './Category';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from "react"
import NewCategoryButton from '../utils/NewCategoryButton'
import Swal from 'sweetalert2';
import NewCategoryModal from './NewCategoryModal';
import IsEmpty from '../utils/IsEmpty';
import Error from '../utils/Error';
import CategoryActions from './CategoryActions';

const Categories = (props)=>{

    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [isError, setIsError] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  

    const submitCategory = async(dataForm)=>{
        
        try{
            const response = await fetch('http://localhost:5000/api/category',{
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    name: dataForm.category,
                    currentUserid: props.currentUser._id
                })
            })
            
            const data = await response.json();
            handleClose();
            
            if(data.status === 'OK'){
                Swal.fire({
                    icon: 'success',
                    title: data.message
                  }).then((value)=>{
                    window.location.href = '/categories';
                  })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: data.message
                  })
            }
        }catch(err){
            console.log(err);
        }  
    }
    
    useEffect(()=>{   
        const getCategories = async ()=>{
            setIsError(null);
            try{
                const response = await fetch('http://localhost:5000/api/categories');

                const data = await response.json();
    
                if(data.status === 'OK'){
                    setCategories(data.categories)
                }
            }catch(err){
                setIsError(err);
            }     
        }
        getCategories();
    },[])

    return(
        <Box className="divCategories">
            {isError? <Error error={isError}/>: (null)}
            <NewCategoryButton userCredentials={props.userCredentials} handleOpen={handleOpen}/>
            <NewCategoryModal open={open}  handleClose={handleClose} submitCategory={submitCategory}/>
            <Typography variant='h5' sx={{ display: 'flex', justifyContent: 'center', m:4}}>Technologies</Typography>
            {categories !== undefined? categories.map((category)=>{
                return(<Box sx={{display:'flex', justifyContent:'center'}} key={category._id}>
                    <Category category={category}/>
                    <CategoryActions currentUser={props.currentUser} userCredentials={props.userCredentials} category={category}/>
                    </Box>)
            }) : <IsEmpty />}
        </Box>
    )
}


export default Categories;