import { AppBar, Toolbar, Typography, Button, Avatar, Box, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          Exit Ease <Typography variant="span" fontSize={14}>(Employee Resignation Management)</Typography>
        </Typography>
        <div>
        {user ? (
          <Box display="flex" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              sx={{ cursor: "pointer" }}
              onClick={handleOpenMenu}
            >
              <Avatar sx={{ bgcolor: "#fff", color: "#1976d2", marginRight: 1 }}>
                {user.username.charAt(0).toUpperCase()}
              </Avatar>
              <Typography>{user.username}</Typography>
            </Box>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleCloseMenu();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button color="inherit" sx={{border:"1px solid #fff", padding: "6px 20px"}} onClick={() => navigate("/")}>
            Login
          </Button>
        )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
