import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState, useRef } from "react";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import Error from '../utils/Error';
import _ from 'lodash';

function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}

const PostForm = (props)=>{
    const {postId} = useParams();
    const editorRef = useRef(null);

    const [titleInput, setTitleInput] = useState('');
    const [technologyCheck, setTechnologyCheck] = useState([]);
    const [technologyCheckUpdate, setTechnologyCheckUpdate] = useState([])
    const [text, setText] = useState('');
    const [isError, setIsError] = useState(null);

    const isUpdate = postId !== undefined ?  true: false;

    const handleSubmit = async(e)=>{
        setIsError(null);
        try{
            const getCategories = technologyCheck.filter((technology)=>{
                return technology.check ===true
            })
    
            const getCategoriesId = getCategories.map((technology)=>{
                return technology.id
            })
          
            const url = isUpdate? `http://localhost:5000/api/post/${postId}` : 'http://localhost:5000/api/post'


            const response = await fetch(url, {
                    method: 'POST',
                    mode:'cors',
                    headers:{
                        'Content-type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        title: titleInput,
                        body: text,
                        category: getCategoriesId,
                        currentUserid: props.currentUser._id 
                    })
            })
           
            
            
            const data = await response.json();
    
            if(data.status ==='OK'){
                Swal.fire({
                    title: data.message,
                    icon: 'success'
                }).then((value)=>{
                    window.location.href = '/';
                })
            }
            else{
                Swal.fire({
                    title: data.message,
                    icon: 'error'
                })
            }
        }catch(err){
            setIsError(err)
        }
       
    }

    const handleChange = (event) => {

        const technologyCheckUpdated = technologyCheck.map((technology, index)=>{
            if(event.target.id === index.toString()){
                
                return { ...technology, check: !technology.check}
            }
            return technology
        });
        setTechnologyCheck(technologyCheckUpdated);
    };

    const updateTechnologyCheck = (technologies, technlogyUse)=>{
        const technologiesUpdate =   technologies.map((technology)=>{
            if(_.some(technlogyUse, ['name', technology.name])){
                return {...technology, check:true}
            }
            return technology;
        })
        return technologiesUpdate;
    }

    useEffect(()=>{
        setIsError(null);
        const getCategories = async()=>{
            try{
                const response = await fetch('http://localhost:5000/api/categories');

                const data = await response.json();
    
                const technologyArray = data.categories.map((category, index)=>{
                    return {id: category._id,
                    name: category.name,
                    index: index,
                    check: false}
                }) 
    
                setTechnologyCheck(technologyArray);
            }catch(err){
                setIsError(err);
            }
        }
        const getPost = async()=>{
            try{
                const response = await fetch(`http://localhost:5000/api/post/${postId}`);

                const data = await response.json();
                
                if(data.status === 'OK'){
                    setTitleInput(data.post.title);
                    setText(decodeEntity(data.post.body));
                    setTechnologyCheckUpdate(data.post.category);
                }
                
            }catch(err){
                setIsError(err);
            }
            
        }
        getCategories();
        if(isUpdate){
            getPost()
        }
    }, [isUpdate, postId])
    
    useEffect(()=>{
        setTechnologyCheck((current)=> updateTechnologyCheck(current, technologyCheckUpdate))
    }, [technologyCheckUpdate])
    
    return(
        <Box className="divCreatePost" sx={{display:'flex', justifyContent:'center'}}>
            {isError ? <Error error={isError}/> : (null)}
            <Card sx={{display:'flex', justifyContent:'center', minWidth:1000, flexDirection:'column', mt:5}}>
                <CardContent sx={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
                    <Typography>Create a new post</Typography>
                    <TextField id="outlined-basic" label="Title" variant="outlined" value={titleInput} onChange={(e)=>{setTitleInput(e.target.value)}} sx={{mt:2}} required/>
                    <Typography sx={{mt:2}}>Please select the technologies you are using in the project</Typography>
                    <Box className='divTechnologies' sx={{display: 'flex', mt:2, mb: 4}}>
                        {technologyCheck ? technologyCheck.map((technology, index)=>{
                            return <FormControlLabel key={index}
                            control={
                                <Checkbox checked={technology.check} onChange={handleChange} id={index.toString()} />
                            }
                            label={technology.name}
                        />
                            
                        }):(null)}
                    </Box>
                    <Editor
                        onInit={(evt, editor) =>  editorRef.current = editor}
                        onEditorChange={(newValue, editor) => {
                            setText(newValue);
                        }}
                        value={text}               
                        apiKey={process.env.REACT_APP_TINY_KEY}
                        init={{
                        height: 500,
                        menubar: false,
                        plugins: [ "advlist", "anchor", "autolink" ,"codesample", " fullscreen","help", "image", "tinydrive",
                        "lists", "link", "media",   "preview",
                        "searchreplace", "table",  "template",  "visualblocks","wordcount"
                        ],
                        toolbar: 'undo redo | formatselect | ' +
                        'bold italic backcolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                    />
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'center'}}>
                    <Button variant='contained' onClick={handleSubmit}>{isUpdate? 'Update': 'Create'}</Button>
                </CardActions>
            </Card>
        </Box>
    )
}


export default PostForm;