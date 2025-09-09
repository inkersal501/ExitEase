import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";  
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from "@mui/material";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

function ViewExitResponse() { 

  const navigate = useNavigate();  
  const { resignationId } = useParams(); 
  const [resignation, setResignation] = useState({}); 
   
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const result = await axios.get(`${API_URL}/admin/exit_response/${resignationId}`);
        setResignation(result.data);
      } catch (error) {
        toast.error(error.result.data.message);
      }
    };
    fetchResponses(); 
  }, [resignationId]);  
 
  return (
    <>    
      <Box
          sx={{ 
            display: "flex",
            flexDirection:"column",
            justifyContent: "start",
            alignItems: "start",
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
          }}
        > 
        <Box sx={{ width:"90%", padding:"10px 40px", display:"flex", justifyContent:'space-between'}}>
          <Typography variant="p" sx={{textAlign:"left"}} gutterBottom color="#444">
            Employee : <b>{resignation.employeeId?.username}</b>
            <br />
            <b>{resignation.employeeId?.email}</b>
          </Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={()=>navigate("/hr-dashboard")}>Back</Button>
          </Box>
        </Box> 
        <Container
          sx={{
            textAlign: "center",
            padding: "4rem 2rem",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h5" gutterBottom color="#444" sx={{marginBottom:"10px"}}>
            Exit Interview Response
          </Typography>
          {resignation?.responses && 
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow> 
                  <TableCell sx={{fontWeight:"bold",color:"#777"}}>Question</TableCell>
                  <TableCell sx={{fontWeight:"bold",color:"#777"}}>Response</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resignation?.responses.map((response, index) => ( 
                  <TableRow key={index}> 
                    <TableCell>{response.questionText}</TableCell>
                    <TableCell>{response.response}</TableCell>
                  </TableRow> 
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          }
        </Container>
      </Box>
    </>
  );
};

export default ViewExitResponse;