import { Box, Container, Modal } from "@mui/material";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import AddIcon from '@mui/icons-material/Add';
import { useSelector } from "react-redux";
import AddRoom from "./RoomManager/AddRoom/AddRoom";
import styled from "@emotion/styled";
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';

// import { auth } from "../../lib/firebase";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];

const ModalWidth = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  /* height: 50%; */
  background-color: white;
  border: none solid #fff;
  padding: 10px;
`;

const ModalSuccess = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
`;

const ModalContent = styled.div`
  background-color: #fff;
  width: 400px;
  /* height: 280px; */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
`;


function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openAddRoom, setOpenAddRoom] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);



  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = async (setting) => {
    // await signOut(auth);
    // Clear any user-related data from local storage if needed
    // localStorage.removeItem("currentUser");
    setAnchorElUser(null);
    // Check if the selected setting is "Logout"
    if (setting === "Logout") {
      // Perform your logout action here
      navigate("/sign-in");
      console.log("Logging out..."); // Replace with your actual logout logic
    } else if (setting === "Profile") {
      navigate("/profile");
    }
  };

  const handleOpenAdd = () => {
    setOpenAddRoom(true)
  }

  //Success PopUp
  const HandleOnSuccessPopUp = () => {
    setShowSuccessModal(true)
  }

  const handleCloseSuccessPopUp = () => {
    setShowSuccessModal(false);
  };



  return (
    <>
      <AppBar position="fixed" sx={{ background: "#B2A59B" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TSHome
            </Typography>

            <Box
              align="center"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              onClick={() => window.location.replace("/")}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TSHome
            </Typography>

            <Box
              align="center"
              sx={{
                flexGrow: 2,
                display: { xs: "none", md: "flex" },
                paddingLeft: "60vh",
              }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    marginX: "10px",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* Thêm phòng */}


            <Box className="mr-5">
              {user ? <p>Hi {user.name}</p> : <p>Welcome, Guest</p>}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu("")}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>

            </Box>
            <Button sx={{ background: "red", marginLeft: "20px", padding: "5px 20px", borderRadius: "5px", flexGrow: 0 }} onClick={() => handleOpenAdd()}>
              <AddIcon />


            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Modal AddRoom */}
      <Modal
        open={openAddRoom}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalWidth>
          {/* Hiển thị form hoặc nội dung modal */}
          <AddRoom
            onClose={() => {
              setOpenAddRoom(false);
            }}
            onSuccessPopUp={() => { HandleOnSuccessPopUp() }}
          />
        </ModalWidth>
      </Modal>

      {/* Modal thanh cong */}
      {showSuccessModal && (
        <ModalSuccess>
          <ModalContent>
            <DoneIcon />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", marginBottom: "40px" }}
            >
              Thành Công
            </Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseSuccessPopUp}
            >
              Đồng ý
            </Button>
          </ModalContent>
        </ModalSuccess>
      )}



    </>
  );
}
export default Header;
