import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import Profile from "../Components/Profile";
import Myprojects from "../Components/Myprojects";
import Header from "../Components/Header";
import Projects from "../Components/Projects";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userName, setusername] = useState();

  const navigate=useNavigate()

  useEffect(() => {
     if (localStorage.getItem("currentUser")) {
       setusername(JSON.parse(localStorage.getItem("currentUser")).userName);
     }else{
      alert("please login first")
      navigate("/")
     }
  }, []);

  return (
    <>
      <Header dashboard />
      <Stack
        direction={{ xs: "column", md: "row" }}
        gap={"30px"}
        px={{ xs: 2, md: 20 }}
        pt={12}
        minHeight={"100vh"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <Box flex={2}>
          <Typography variant="h4" color="inherit">
            Welcome {userName}
          </Typography>
          <Myprojects></Myprojects>
          <Projects></Projects>
        </Box>
        <Profile userName={userName} setusername={setusername} />
      </Stack>
    </>
  );
};

export default Dashboard;
