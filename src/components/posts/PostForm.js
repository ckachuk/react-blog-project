import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useRef } from "react";
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import Error from '../utils/Error';
import { FormInputText } from '../utils/form-components/FormInputText';
import {  useForm } from "react-hook-form";
import { FormInputMultiCheckbox } from '../utils/form-components/FormInputCheckbox';
import { CardActions } from '@mui/material';
import {useQuery,useMutation, useQueryClient } from 'react-query'
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

function decodeEntity(inputStr) {
    var textarea = document.createElement("textarea");
    textarea.innerHTML = inputStr;
    return textarea.value;
}

const PostForm = ({currentUser})=>{
    const {postId} = useParams();
    const editorRef = useRef(null);
    const isUpdate = postId !== undefined ?  true: false;
    const { handleSubmit, control, setValue } = useForm();
    const queryClient = useQueryClient();

    const [loadedTechnology, setLoadedTechnology] = useState([]);
    const [technlogyChecked, setTechnologyChecked] = useState([]);
    const [text, setText] = useState('');

    const {errorPost, loadingPost} = useQuery('dataPost', async()=>{
        if(isUpdate){
            const response = await axios.get(`http://localhost:5000/api/post/${postId}`);

            setTechnologyChecked(response.data.post.category)
            setValue('title', response.data.post.title)
            setText(decodeEntity(response.data.post.body));     
            
            return response.data
        }
        else{
            return;
        }
    })
    
    
    const {errorCategory, loadingCategory} = useQuery('dataCategories', async()=>{
        const response = await axios.get('http://localhost:5000/api/categories');
        
        const technologyArray = response.data.categories.map((category, index)=>{
            return {id: category._id,
            name: category.name,
            index: index,
            check: false}
        }) 
        setLoadedTechnology(technologyArray);

        return response.data;
    })

  
    const formPost = async(post)=>{
        const url = isUpdate? `http://localhost:5000/api/post/${postId}` : 'http://localhost:5000/api/post';
        return await axios.post(url, post, {
            mode: 'cors',
            headers:{
                'Content-type': 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem("token")}`
            }
        }) 
    } 

    const formPostMutation = useMutation(formPost, {
        onSuccess: ()=>{
            queryClient.invalidateQueries();
            Swal.fire({
                icon: 'success',
                title: 'The post has been created'
            })
        },
        onError: ()=>{
            Swal.fire({
                icon: 'error',
                title: 'Something wrong happened'
            })
        } 
    }) 


    const submit = async({title, technologies})=>{

        const getCategories = loadedTechnology.filter((technology)=>{
            return technologies.includes(technology.index)
        });

        const getCategoriesId = getCategories.map((technology)=>{
            return technology.id
        });

        formPostMutation.mutate({title: title, body: text, category: getCategoriesId, currentUserid: currentUser._id})
    }

    return(
        <Box className="divCreatePost" sx={{display:'flex', justifyContent:'center'}}>
            {loadingPost? <CircularProgress/>: (null)}
            {errorPost? <Error error={errorPost}/> : (null)}
            {loadingCategory? <CircularProgress/>: (null)}
            {errorCategory? <Error error={errorCategory}/> : (null)}
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