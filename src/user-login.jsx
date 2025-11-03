import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export function UserLogin(){

    const navigate = useNavigate();
    
    // ✅ Render backend URL
    const API_BASE = "https://video-project-gu9c.onrender.com";

    const formik = useFormik({
        initialValues: {
            user_id: '',
            password: ''
        },
        onSubmit: (user)=>{
             axios.get(`${API_BASE}/users`)
             .then(response=>{
                  const result = response.data.find(item => item.user_id === user.user_id);
                  if(result){
                      if(user.password === result.password){
                          navigate('/user-dashboard');
                      } else {
                          alert('Invalid Password');
                      }
                  } else {
                      alert('Invalid User Id');
                  }
             })
             .catch(err=>{
                 console.error(err);
                 alert('Login failed. Please try again.');
             })
        }
    })

    return(
        <div className="bg-light p-3 w-25">
            <h2>User Login</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="my-2">
                    <TextField 
                        onChange={formik.handleChange} 
                        name="user_id" 
                        variant="outlined" 
                        label="User Id" 
                        fullWidth 
                    />
                </div>
                <div className="my-2">
                    <TextField 
                        onChange={formik.handleChange} 
                        name="password" 
                        type="password" 
                        variant="outlined" 
                        label="Password" 
                        fullWidth 
                    />
                </div>
                <Button type="submit" variant="contained" color="warning" fullWidth>
                    Login
                </Button>
            </form>
            <Link to="/user-register" className="btn btn-link">New User Register</Link>
        </div>
    )
}
