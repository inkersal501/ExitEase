import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/authSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../config";

const ViewExitResponses = () => {

  const [responses, setResponses] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    fetchExitResponses();
  }, []);

  const fetchExitResponses = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/exit_responses`, {
        headers: { Authorization: `${user.token}` },
      });
      setResponses(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
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
      <Typography variant="h4" gutterBottom>
        View Exit Responses
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {responses.map((response) => (
              response.responses.map((qna, index) => (
                <TableRow key={`${response.employeeId}-${index}`}>
                  <TableCell>{response.employeeId}</TableCell>
                  <TableCell>{qna.questionText}</TableCell>
                  <TableCell>{qna.response}</TableCell>
                </TableRow>
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  );
};

export default ViewExitResponses;