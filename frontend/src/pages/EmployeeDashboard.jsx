import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth"; 
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import { Typography, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box } from "@mui/material";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

const EmployeeDashboard = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [lwd, setLwd] = useState("");
  const [reason, setReason] = useState("");
  const lwdRef = useRef();
  const [resignSubmitted, setResignSubmitted] = useState(false);
  const [resignStatus, setResignStatus] = useState("");

  const { getUser, updateResignationStatus } = useAuth();
  const { user } = getUser;  
  
  useEffect(() =>{ 
    if (!user) {
      navigate("/"); 
    }
    //eslint-disable-next-line
  }, [user]);

  useEffect(()=>{
    if (open && lwdRef.current) {
      lwdRef.current.focus();
    }
  }, [open]);
  
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!lwd || !reason) {
      toast.error("Please enter all required fields.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user/resign`, { lwd, reason });

      if (response.status === 200) {
        toast.success("Resignation submitted successfully!"); 
        setResignSubmitted(true);
        setResignStatus("Pending");
        handleClose();
      } 

    } catch (error) { 
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const checkResign = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/check-resign`);

        if(response.data.submitted){
          setResignSubmitted(true);
          setResignStatus(response.data.status); 
          updateResignationStatus(response.data.resignationId);
        }else { 
          updateResignationStatus("");
        }

      } catch (error) {
        console.log(error)
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
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography variant="h5" gutterBottom color="#444">
            Welcome, {user.username}!
          </Typography>

          {!resignSubmitted ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ marginTop: "1.5rem" }}
            >
              Submit your resignation here
            </Button>
          ) : (
            <>
            {resignStatus === "Exit" && <Typography variant="h2">Happy Exit.</Typography>}
            {resignStatus === "Exit" && <Typography variant="h4">Congratulations for your future.!</Typography>}
            {resignStatus === "Pending" && <Typography variant="h4">Your resignation request was submitted</Typography>}
            {resignStatus === "Pending" && <Typography variant="p">Your resignation approval/rejection is Pending from HR manger</Typography>}
            {resignStatus === "Approved" && <Typography>Your resignation is approved</Typography>}
            {resignStatus === "Rejected" && <Typography>Your resignation is rejected</Typography>} 
            {resignStatus === "Rejected" && 
              <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ marginTop: "1.5rem" }}
            >
              Re-Submit your resignation here
            </Button>
            }
            {resignStatus === "Approved" && <Typography>Please fill the below exit questionnaire feedback for us. !</Typography>}
            {resignStatus === "Approved" && <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/exit-questionnaire")}
              sx={{ marginTop: "1rem" }}
            >
              Exit Questionnaire
            </Button>}
            </>
          )}
        </Container>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h5" sx={{padding:"20px"}}>Submit Resignation</DialogTitle>
        <DialogContent>
          <TextField  
            label="Last Working Day" 
            type="date"
            fullWidth 
            value={lwd} 
            onChange={(e) => setLwd(e.target.value)}
            inputRef={lwdRef}
            sx={{margin:"10px 0px"}}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Reason for Resignation"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{display:"flex", justifyContent:"center", paddingBottom:"30px"}}>
          <Button onClick={handleClose} color="secondary" sx={{border:"1px solid", padding:"6px 20px"}}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" sx={{background:"#1976d2",color:"#fff", padding:"6px 20px"}}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeDashboard;
