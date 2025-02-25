import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { Typography, Button, Container, TextField, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { API_URL } from "../config";

const ExitQuestionnaire = () => {
  
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const [responses, setResponses] = useState([
    { questionText: "What prompted you to resign?", response: "" },
    { questionText: "How was your experience working with us?", response: "" },
    { questionText: "What could we improve in our organization?", response: "" },
    { questionText: "Would you consider working with us again?", response: "" },
  ]);

  if (!user || !localStorage.getItem("resignationId")) {
    navigate("/");
    return null;
  }

  const handleChange = (index, value) => {
    const updatedResponses = [...responses];
    updatedResponses[index].response = value;
    setResponses(updatedResponses);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        `${API_URL}/user/responses`,
        { responses },
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );
      toast.success("Exit interview submitted successfully!");
      localStorage.removeItem("resignationId");
      navigate("/dashboard");
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
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Container
          sx={{
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
        <Typography variant="h4" gutterBottom color="#444">
          Exit Interview
        </Typography> 
        {responses.map((item, index) => (
          <TextField
            key={index}
            label={item.questionText}
            multiline
            rows={3}
            fullWidth
            margin="normal"
            value={item.response}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))} 
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1rem" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Container>
      </div>
    </>
  );
};

export default ExitQuestionnaire;
