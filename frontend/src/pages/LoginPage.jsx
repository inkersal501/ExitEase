import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import useAuth from "../context/useAuth";
import axios from "axios";
import { toast } from "react-toastify"; 
import { API_URL } from "../config";
import { Card, CardContent, TextField, Button, Typography, Box } from "@mui/material";

const LoginPage = () => {
  
  const [form, setForm] = useState({ email: "", password: "" });
  const {login} = useAuth(); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!form.email){
      toast.error("Invalid Email."); return;
    } else if(!form.password){
      toast.error("Invalid Password."); return;
    }  
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, form);
      if (response.status === 200) {
        const { token, role, username } = response.data; 
        login({ token, role, username });
        toast.success("Login successful!");

        if (role === "HR") {
          navigate("/hr-dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <> 
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 3, borderRadius:"10px" }}>
          <CardContent>
            <Typography variant="h3" align="center" sx={{margin:"10px 0px"}}>
             <Typography variant="span" fontSize={14}>Employee</Typography> Login
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{margin:"10px 0px"}}>
                Login
              </Button>
            </form>
            <Typography mt={2}>
              Not Registered? <Link to="/register" sx={{color:"#222"}}>Register Here.</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default LoginPage;
