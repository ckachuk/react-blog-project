import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import {QueryClient, QueryClientProvider } from 'react-query'


const ProtectedRoute = ({  currentUser, children}) => {
    let token = currentUser!==null ? localStorage.getItem('token') : null;
    let decodedToken = token !== null ? jwt_decode(token): null;
    let currentDate = new Date();

    

    if(decodedToken === null){
        return <Navigate replace to="/login"/>
    }
    else if( decodedToken.exp * 1000 < currentDate.getTime()) {
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
  
const queryClient = new QueryClient()
  
const RouteSwitch = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    
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
        console.log(`${process.env.REACT_APP_BACKEND_URL}/api/login`)
        try{
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
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
        navigate('/login')
    }

    

    useEffect(()=>{
        const getUser = async()=>{
            try{
                if(currentUser != null ){
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/user/${currentUser._id}`);
    
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
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                <NavBar currentUser={currentUser} userCredentials={userCredentials} handleLogout={handleLogout}/>
                    <Routes>
                        <Route path="react-blog-project/" element={<Homepage currentUser={currentUser} userCredentials={userCredentials}/>} />
                        <Route path="react-blog-project/login" element={<Login handleInputLogin={handleInputLogin} handleSubmitLogin={handleSubmitLogin} setCurrentUser={setCurrentUser} setUserCredentials={setUserCredentials}/>}/>
                        <Route path="react-blog-project/signup" element={<SignUp/>}/>
                        <Route path="react-blog-project/categories" element={
                        <ProtectedRoute currentUser={currentUser}>
                            <Categories currentUser={currentUser} userCredentials={userCredentials}/>
                        </ProtectedRoute>
                        }/>
                        <Route path="react-blog-project/categories/:categoryId" element={<CategoryPosts />}/>
                        <Route path="react-blog-project/:postId" element={<Post  currentUser={currentUser}  userCredentials={userCredentials}/>} />
                        <Route path="react-blog-project/post" element={
                        <ProtectedRoute currentUser={currentUser} >
                            <PostForm currentUser={currentUser}/>
                        </ProtectedRoute>
                        }/>
                        <Route path="react-blog-project/post/:postId" element={
                        <ProtectedRoute currentUser={currentUser} >
                            <PostForm currentUser={currentUser}/>
                        </ProtectedRoute>
                        }/>
                        <Route path="react-blog-project/posts/unpublish" element={
                        <ProtectedRoute currentUser={currentUser}>
                            <UnpublishPosts currentUser={currentUser} userCredentials={userCredentials}/>
                        </ProtectedRoute>
                        }/>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Box>  
    );
};


export default RouteSwitch;