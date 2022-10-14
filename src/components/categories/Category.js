import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Category = ({category})=>{
    return(
        <Box className="divCategory" sx={{ display: 'flex', justifyContent: 'center'}}>
            <Card sx={{display: 'flex', justifyContent: 'center',minWidth: 700, minHeight:70, m: 5 }}>
                <CardActions>
                    <Link to={category._id}><Button size="large"  sx={{color:'#262c50'}}>{category.name}</Button></Link>
                </CardActions>
            </Card>
        </Box>
    )
}


export default Category;