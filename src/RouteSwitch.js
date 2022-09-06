import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Homepage";
import Box from '@mui/material/Box';
import NavBar from "./components/navbar/NavBar";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import Categories from "./components/categories/Categories";
import PostForm from "./components/posts/PostForm";
import CategoryPosts from "./components/categories/CategoryPosts";
import Post from './components/posts/Post';
import Swal from 'sweetalert2';
import UnpublishPosts from "./components/posts/UnpublishPosts";
import {useEffect, useState} from "react";
import jwt_decode from "jwt-decode";



const ProtectedRoute = ({ setCurrentUser, setUserCredentials, currentUser, children }) => {
    let token = localStorage.getItem('token');
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    
    if (!currentUser || decodedToken.exp * 1000 < currentDate.getTime()) {
        
      return <Navigate to="/login" replace />;
    }

    return children;
};


const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
  

  
const RouteSwitch = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    console.log(localStorage.getItem('token'))
    const [userLogin, setUserLogin]= useState({
        username: '',
        password: ''
    });

    const [userCredentials, setUserCredentials] = useState();

    const handleInputLogin = (e)=>{
        e.preventDefault();
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmitLogin = async()=>{
        try{
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: userLogin.username,
                    password: userLogin.password
                })
            });

            const data = await response.json(); 

            if(data.status === 'OK'){
                Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully',
                    timer: 1000
                }).then((value)=>{
                    localStorage.setItem('token', data['token']);
                    localStorage.setItem('user', JSON.stringify(data['user']));
                    setCurrentUser(JSON.parse(localStorage.getItem('user')));
                    window.location.href = '/';
                })                
                
            }else{
                Toast.fire({
                    icon: 'error',
                    title: data.message
                }) 
            }

        }catch(err){
            Toast.fire({
                icon: 'error',
                title: err
            })            
        }
    }
    
    const handleLogout = (e)=>{
        e.preventDefault()
    
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setCurrentUser();
        setUserCredentials();
        window.location.href = '/';
    }

    

    useEffect(()=>{
        const getUser = async()=>{
            try{
                if(currentUser != null ){
                    const response = await fetch(`http://localhost:5000/api/user/${currentUser._id}`);
    
                    const data = await response.json();
                    setUserCredentials({
                        isAdmin: data.user.credential.isAdmin,
                        isAuthor: data.user.credential.isAuthor
                    });
                }
            }catch(err){
                console.log(err);
            }
        }
        getUser();
    }, [currentUser])

   

    return (
        <Box>
            <BrowserRouter>
            <NavBar currentUser={currentUser} userCredentials={userCredentials} handleLogout={handleLogout}/>
                <Routes>
                    <Route path="/" element={<Homepage currentUser={currentUser} userCredentials={userCredentials}/>} />
                    <Route path="login" element={<Login handleInputLogin={handleInputLogin} handleSubmitLogin={handleSubmitLogin} setCurrentUser={setCurrentUser} setUserCredentials={setUserCredentials}/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                    <Route path="categories" element={
                    <ProtectedRoute currentUser={currentUser} >
                        <Categories currentUser={currentUser} userCredentials={userCredentials}/>
                    </ProtectedRoute>
                    }/>
                    <Route path="categories/:categoryId" element={<CategoryPosts />}/>
                    <Route path=":postId" element={<Post  currentUser={currentUser}  userCredentials={userCredentials}/>} />
                    <Route path="post" element={
                    <ProtectedRoute currentUser={currentUser} >
                        <PostForm currentUser={currentUser}/>
                    </ProtectedRoute>
                    }/>
                    <Route path="post/:postId" element={
                    <ProtectedRoute currentUser={currentUser}>
                        <PostForm currentUser={currentUser}/>
                    </ProtectedRoute>
                    }/>
                    <Route path="posts/unpublish" element={
                    <ProtectedRoute currentUser={currentUser}>
                        <UnpublishPosts currentUser={currentUser} userCredentials={userCredentials}/>
                    </ProtectedRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </Box>  
    );
};


export default RouteSwitch;