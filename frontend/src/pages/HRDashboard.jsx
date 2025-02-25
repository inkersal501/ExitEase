import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import { Typography, Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { API_URL } from "../config";

const HRDashboard = () => {
    
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [resignations, setResignations] = useState([]);

  if (!user || user.role !== "HR") {
    navigate("/");
    return null;
  }

  useEffect(() => {

    const fetchResignations = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/resignations`, {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        });
        setResignations(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchResignations();

  }, []);

  const handleDecision = async (resignationId, approved, lwd) => { 
    try {
      await axios.put(
        `${API_URL}/admin/conclude_resignation`,
        { resignationId, approved, lwd },
        { headers: { Authorization: `${localStorage.getItem("token")}` } }
      );

      toast.success(approved ? "Resignation approved!" : "Resignation rejected!");
      setResignations(resignations.filter((res) => res._id !== resignationId));
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
          HR Dashboard - Resignation Requests
        </Typography>
        {resignations.length === 0 ? (
          <Typography>No resignation requests found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Last Working Day</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resignations.map((resignation) => (
                  <TableRow key={resignation._id}>
                    <TableCell>{resignation.employeeId}</TableCell>
                    <TableCell>{resignation.lwd}</TableCell>
                    <TableCell>{resignation.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleDecision(resignation._id, true, resignation.lwd)}
                        sx={{ marginRight: "8px" }}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDecision(resignation._id, false, resignation.lwd)}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      </div>
    </>
  );
};

export default HRDashboard;
