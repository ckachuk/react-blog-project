import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Box from '@mui/material/Box';
import NavBar from "./components/navbar/NavBar";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import Categories from "./components/categories/Categories";
import CreateCategoryForm from "./components/categories/CreateCategoryForm";
import CreatePostForm from "./components/posts/CreatePostForm";
import BecomeAuthorForm from "./components/privileges/BecomeAuthorForm"

const ProtectedRoute = ({ currentUser, children }) => {
    if (!currentUser) {
      return <Navigate to="/login" replace />;
    }

    return children;
};

  
const RouteSwitch = () => {

    const currentUser = {
        credential:{
            isAuthor: false,
            isAdmin: true
        }
    }

    
    return (
        <Box>
            <BrowserRouter>
            <NavBar currentUser={currentUser}/>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/categories" element={
                    <ProtectedRoute currentUser={currentUser}>
                        <Categories/>
                    </ProtectedRoute>
                    }/>
                    <Route path="/new-post" element={
                    <ProtectedRoute currentUser={currentUser}>
                        <CreatePostForm/>
                    </ProtectedRoute>
                    }/>
                    <Route path="/new-category" element={
                    <ProtectedRoute currentUser={currentUser}>
                        <CreateCategoryForm/>
                    </ProtectedRoute>
                    }/>
                    <Route path="/become-author" element={
                    <ProtectedRoute currentUser={currentUser}>
                        <BecomeAuthorForm/>
                    </ProtectedRoute>
                    }/>
                </Routes>
            </BrowserRouter>
        </Box>  
    );
};


export default RouteSwitch;