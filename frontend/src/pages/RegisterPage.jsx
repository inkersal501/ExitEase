import { useState } from "react";
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const RegisterPage = () => {
  
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!form.username){
      toast.error("Invalid Username."); return;
    } else if (!form.email){
      toast.error("Invalid Email."); return;
    } else if(!form.password){
      toast.error("Invalid Password."); return;
    } 

    try {
      const response = await axios.post(`${API_URL}/auth/register`, form);
      if (response.status === 201) {
        toast.success("Registration successful! Please login.");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
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
              <Typography variant="span" fontSize={14}>Employee</Typography> Register
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                margin="normal"
              />
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
                Register
              </Button>
            </form>
            <Typography mt={2}>
              Already have an account? <Link to="/">Login here.</Link>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
