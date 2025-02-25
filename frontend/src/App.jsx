import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/authSlice";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import HRDashboard from "./pages/HRDashboard";
import ResignationPage from "./pages/ResignationPage";
import ViewExitResponses from "./pages/ViewExitResponses";
import ExitQuestionnaire from "./pages/ExitQuestionnaire";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const user = useSelector(selectUser);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : user.role === "HR" ? <Navigate to="/hr-dashboard" /> : <Navigate to="/dashboard" />} />
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
          path="/resign" 
          element={
            <ProtectedRoute allowedRoles={["Employee"]}>
              <ResignationPage />
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
          path="/exit-responses" 
          element={
            <ProtectedRoute allowedRoles={["HR"]}>
              <ViewExitResponses />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router> 
  );
};

export default App;
