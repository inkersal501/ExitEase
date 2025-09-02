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

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "start",
          alignItems: "start",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      > 
      <div style={{textAlign:"left", padding:"20px"}}>
        <Typography variant="h6" sx={{textAlign:"left"}} gutterBottom color="#444">
          HR Dashboard
        </Typography>
      </div>
        <Container
          sx={{
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        > 
        <Typography variant="h5" gutterBottom color="#444" sx={{marginBottom:"10px"}}>
         Employee&apos;s Resignation Requests
        </Typography>
        {resignations.length === 0 ? (
          <Typography>No resignation requests found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{}}>
                  <TableCell sx={{fontWeight:"bold",color:"#777"}}>Employee</TableCell>
                  <TableCell sx={{fontWeight:"bold",color:"#777"}}>Last Working Day</TableCell>
                  <TableCell sx={{fontWeight:"bold",color:"#777"}}>Status</TableCell>
                  <TableCell sx={{fontWeight:"bold",color:"#777"}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resignations.map((resignation) => (
                  <TableRow key={resignation._id}>
                    <TableCell><b>{resignation.employeeId?.username}</b>
                      <br />
                      {resignation.employeeId?.email}
                    </TableCell>
                    <TableCell>{formatDate(resignation.lwd)}</TableCell>
                    <TableCell>{resignation.status}</TableCell>
                    <TableCell>
                      {resignation.status === "Pending" &&
                      <>
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
                      </>}
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
