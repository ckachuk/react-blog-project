import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Category = (props)=>{
    return(
        <Box className="divCategory" sx={{ display: 'flex', justifyContent: 'center'}}>
            <Card sx={{display: 'flex', justifyContent: 'center',minWidth: 700, m: 5 }}>
                <CardActions>
                    <Link to={props.category._id}><Button size="large"  sx={{color:'#262c50'}}>{props.category.name}</Button></Link>
                </CardActions>
            </Card>
        </Box>
    )
}


export default Category;