import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useEffect, useState, useRef } from "react";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import Error from '../utils/Error';
import { FormInputText } from '../utils/form-components/FormInputText';
import {  useForm } from "react-hook-form";
import { FormInputMultiCheckbox } from '../utils/form-components/FormInputCheckbox';
import { CardActions } from '@mui/material';

function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}

const PostForm = (props)=>{
    const {postId} = useParams();
    const editorRef = useRef(null);

    const [loadedTechnology, setLoadedTechnology] = useState([]);
    const [technlogyChecked, setTechnologyChecked] = useState([]);
    const [text, setText] = useState('');
    const [isError, setIsError] = useState(null);

    const isUpdate = postId !== undefined ?  true: false;

    const { handleSubmit, control, setValue } = useForm();

    const submit = async({title, technologies})=>{
        setIsError(null);
        const getCategories = loadedTechnology.filter((technology)=>{
            return technologies.includes(technology.index)
        });

        const getCategoriesId = getCategories.map((technology)=>{
            return technology.id
        });

        
        try{
            const url = isUpdate? `http://localhost:5000/api/post/${postId}` : 'http://localhost:5000/api/post'

            const response = await fetch(url, {
                    method: 'POST',
                    mode:'cors',
                    headers:{
                        'Content-type': 'application/json',
                        'Authorization' : `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        title: title,
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

    const getPost = async()=>{
        try{
            const response = await fetch(`http://localhost:5000/api/post/${postId}`);

            const data = await response.json();
            
            if(data.status === 'OK'){
               return data
            }
        }catch(err){
            setIsError(err);
        }
    }

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

            setLoadedTechnology(technologyArray);
        }catch(err){
            setIsError(err);
        }
    }


    useEffect(()=>{
        setIsError(null);

        getCategories();
        if(isUpdate){
           getPost().then((data)=>{
            setTechnologyChecked(data.post.category)
            setValue('title', data.post.title)
            setText(decodeEntity(data.post.body));     
           })
        }
    }, [])


    return(
        <Box className="divCreatePost" sx={{display:'flex', justifyContent:'center'}}>
            {isError ? <Error error={isError}/> : (null)}
            <Card sx={{display:'flex', justifyContent:'center', minWidth:1000, flexDirection:'column', mt:7}}>
                <Typography variant='h4' sx={{m:2}}>{isUpdate? "Update post" : "Create post"}</Typography>
                    <FormInputText name="title"  control={control} label="Title"/>
                    <FormInputMultiCheckbox name="technologies" control={control} label="Technologies" options={loadedTechnology} optionsChecked={technlogyChecked} setValue={setValue}/>
                    <Box sx={{ml:4, mr: 4}}>
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
                    </Box>
                    <CardActions sx={{display:'flex', justifyContent:'center', mt:1, mb:2}}>
                        <Button variant='contained' sx={{width:'30%'}} onClick={handleSubmit(submit)}>{isUpdate? 'Update': 'Create'}</Button>
                    </CardActions>
                    
            </Card>
        </Box>
    )
}


export default PostForm;