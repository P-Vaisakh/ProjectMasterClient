import { AppBar, Button, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ dashboard }) => {
  const navigate = useNavigate();
  const signout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentId");
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <AppBar
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        pr: { xs: 2, md: 10 },
      }}
    >
      <Typography
        variant="h4"
        color="initial"
        fontFamily={"montserrat"}
        fontWeight={"700"}
        sx={{ color: "#fff", px: { xs: 2, md: 10 }, py: 2 }}
      >
       <Link to={"/"} style={{color:"white",textDecoration:"none"}}>Logo</Link>
      </Typography>
      {dashboard && (
        <Button color="secondary" onClick={signout} sx={{color:"white"}}>
          Logout
        </Button>
      )}
    </AppBar>
  );
};

export default Header;
