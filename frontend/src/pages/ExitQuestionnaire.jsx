import { useState, useEffect } from "react";
import useAuth from "../context/useAuth";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import { Typography, Button, Container, TextField, Box } from "@mui/material";

const ExitQuestionnaire = () => {

  const navigate = useNavigate();
  const [resignationId, setResignationId] = useState("");
  const { user } = useAuth().getUser; 

  const [responses, setResponses] = useState([
    { questionText: "What prompted you to resign?", response: "" },
    { questionText: "How was your experience working with us?", response: "" },
    { questionText: "What could we improve in our organization?", response: "" },
    { questionText: "Would you consider working with us again?", response: "" },
  ]);

  if (!user) {
    navigate("/"); 
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
        { responses, resignationId },
        { headers: { Authorization: `${user.token}` } }
      );
      toast.success("Exit interview submitted successfully!"); 
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkResign = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/user/check-resign`,
          { headers: { Authorization: `${user.token}` } }
        );

        if(response.data.submitted){ 
          setResignationId(response.data.resignationId);
        } 

      } catch (error) {
        console.log(error);
      }        
    };
    checkResign();
    //eslint-disable-next-line
  }, []);
  
  return (
    <> 
      <Box
        sx={{
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
            borderRadius: "10px",
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
            rows={2}
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
      </Box>
    </>
  );
};

export default ExitQuestionnaire;
