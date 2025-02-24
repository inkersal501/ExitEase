import { useState } from "react"; 
import { Card, CardContent, TextField, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(`${API_URL}/auth/login`, form);
      console.log(response);
      if (response.status === 200) {
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(`Login failed: ${response.data.message}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
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
        <Card sx={{ maxWidth: 400, width: "100%", padding: 3, boxShadow: 3 }}>
          <CardContent> 
          <Typography variant="h5" align="center">Employee Login</Typography>
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
              type="password"
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
          <Typography mt={2}>Not Yet Registered <Link to="/register">Register Here.</Link></Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
