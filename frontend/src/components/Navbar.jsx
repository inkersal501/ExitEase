import { AppBar, Toolbar, Typography, Button, Avatar, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          ExitEase
        </Typography>

        {user ? (
          <Box display="flex" alignItems="center">
            <Avatar 
              sx={{ bgcolor: "#fff", color: "#1976d2", marginRight: 1 }}
            >
              {user.username.charAt(0).toUpperCase()}
            </Avatar>
            <Typography sx={{ marginRight: 2 }}>{user.username}</Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Button color="inherit" onClick={() => navigate("/")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
