import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateResignationStatus } from "../redux/authSlice";
import { Typography, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const EmployeeDashboard = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [lwd, setLwd] = useState("");
  const [reason, setReason] = useState("");

  if (!user) {
    navigate("/");
    return null;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!lwd || !reason) {
      toast.error("Please enter all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/user/resign`,
        { lwd, reason },
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );

      if (response.status === 200) {
        toast.success("Resignation submitted successfully!");
        localStorage.setItem("resignationId", response.data.data.resignation._id);
        dispatch(updateResignationStatus(response.data.data.resignation._id));
        handleClose();
      } 
    } catch (error) { 
      toast.error(error.response.data.message);
    }
  };

  const hasResigned = !!localStorage.getItem("resignationId");

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
            Welcome, {user.username}!
          </Typography>

          {!hasResigned ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              sx={{ marginTop: "1rem" }}
            >
              Submit Resignation
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/exit-questionnaire")}
              sx={{ marginTop: "1rem" }}
            >
              Exit Questionnaire
            </Button>
          )}
        </Container>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Resignation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Last Working Day"
            type="date"
            fullWidth 
            value={lwd}
            onChange={(e) => setLwd(e.target.value)}
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
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeDashboard;
