import { Box, Stack, Typography, Button, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import CardGrid from "../Components/CardGrid";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

const useStyles = makeStyles((theme) => ({
  coverImg: {
    width: "300px",
    [theme.breakpoints.up("md")]: {
      width: "550px",
    },
  },
}));

const Home = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("currentId")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Container>
      <Header></Header>
      <Stack
        sx={{
          pt: "100px",
          height: { lg: "100vh" },
          flexDirection: "column",
          [theme.breakpoints.up("lg")]: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "50px",
          },
        }}
      >
        <Box flex={1} alignSelf={"center"}>
          {" "}
          <Typography
            variant="h3"
            color="primary"
            fontFamily={"Montserrat"}
            fontWeight={700}
            sx={{ fontSize: { xs: "38px", md: "43.3px" } }}
          >
            One Project Manager App to Replace them All
          </Typography>
          <Typography variant="h6" color="GrayText" mt={2}>
            Minimal and flexible project management tool thats going to save you
            a ton of time. Lorem ipsum dolor sit amet consectetur adipisicing
            elit.
          </Typography>
          {loggedIn ? (
            <Link to={"/dashboard"}>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                explore
              </Button>
            </Link>
          ) : (
            <Link to={"/login"}>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Get Started - Its Free
              </Button>
            </Link>
          )}
        </Box>
        <Box flex={0.8} textAlign={"center"}>
          <img src="/img/cover.png" alt="cover" className={classes.coverImg} />
        </Box>
      </Stack>
      <Typography
        variant="h3"
        color="inherit"
        textAlign={"center"}
        my={5}
        fontSize={"40px"}
      >
        See Projects
      </Typography>

      <Box textAlign={"center"} minHeight={"100vh"}>
        <CardGrid></CardGrid>
      </Box>
    </Container>
  );
};

export default Home;
