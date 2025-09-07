import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HRDashboard from "./pages/HRDashboard"; 
import ViewExitResponse from "./pages/ViewExitResponse";
import ExitQuestionnaire from "./pages/ExitQuestionnaire";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import useAuth from "./context/useAuth";

const App = () => {
  const { user } = useAuth().getUser; 

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : (user.role === "HR" ? <Navigate to="/hr-dashboard" /> : <Navigate to="/dashboard" />)} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/hr-dashboard" 
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <HRDashboard />
            </ProtectedRoute>
          } 
        /> 
        <Route 
          path="/exit-questionnaire" 
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <ExitQuestionnaire />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/exit-response/:resignationId" 
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <ViewExitResponse />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router> 
  );
};

export default App;
