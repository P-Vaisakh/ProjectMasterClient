import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../service/allRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = ({ register }) => {
  // states for validation
  const [unameValid, setUnameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPassworValid] = useState(false);

  // toggle b/w register and login
  const isRegisterForm = register ? true : false;

  const navigate = useNavigate();

  // state for request
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  // setting state on change
  const setInputs = (e) => {
    const { name, value } = e.target;
    if (name === "userName") {
      if (value.match(/^[a-zA-Z ]+$/)) {
        setUnameValid(false);
      } else {
        setUnameValid(true);
      }
    }
    if (name === "email") {
      if (value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
        setEmailValid(false);
      } else {
        setEmailValid(true);
      }
    }
    if (name === "password") {
      if (value.match(/^[a-zA-Z0-9@]{5,10}$/)) {
        setPassworValid(false);
      } else {
        setPassworValid(true);
      }
    }
    setUser({ ...user, [name]: value });
  };

  // function to handle signup
  const handleRegister = async (e) => {
    e.preventDefault();
    const { userName, email, password } = user;
    if (!userName || !email || !password) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const response = await registerApi(user);
      if (response.status == 200) {
        toast.success("Account created succesfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/login");
        setUser({
          userName: "",
          email: "",
          password: "",
        });
      } else {
        toast.error(response.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  // function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const response = await loginApi(user);
      if (response.status == 200) {
        // setting token in session storage
        localStorage.setItem("token", response.data.token);

        localStorage.setItem("currentId", response.data.user._id);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));

        toast.success("Login succesful", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
        setUser({
          userName: "",
          email: "",
          password: "",
        });
      } else {
        toast.error(response.response.data, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
      py={"100px"}
      sx={{height:{lg:"100vh"}}}
    >
      <Box flex={{ md: 1 }} textAlign={"center"}>
        <img src="/img/auth.jpeg" width={"100%"} alt="" />
      </Box>
      <Box
        sx={{ flex: { md: "1" } }}
        display={"flex"}
        alignItems={"start"}
        justifyContent={"center"}
      >
        <Paper
          elevation={2}
          sx={{ width: { xs: "98%", md: "70%", padding: "25px" } }}
        >
          <Typography
            variant="h5"
            color="initial"
            sx={{ mb: 2 }}
            textAlign={"center"}
            fontFamily={"montserrat"}
          >
            {isRegisterForm ? "Register to continue" : "Login to Continue"}
          </Typography>
          <form
            action=""
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            {isRegisterForm && (
              <>
                <TextField
                  label="Name"
                  sx={{ mt: 2.5 }}
                  variant="standard"
                  fullWidth
                  onChange={(e) => setInputs(e)}
                  name="userName"
                  value={user.userName}
                />
                {unameValid && <p>include characters only</p>}
              </>
            )}
            <>
              <TextField
                label="Email"
                sx={{ mt: 2.5 }}
                variant="standard"
                fullWidth
                onChange={(e) => setInputs(e)}
                name="email"
                value={user.email}
              />
              {emailValid && <p>invalid email</p>}
            </>
            <>
              <TextField
                label="Password"
                sx={{ mt: 2.5 }}
                variant="standard"
                fullWidth
                onChange={(e) => setInputs(e)}
                name="password"
                value={user.password}
                type="password"
                autoComplete="off"
              />
              {passwordValid && <p>password not valid</p>}
            </>
            {isRegisterForm ? (
              <Button
                type="submit"
                variant="contained"
                onClick={(e) => handleRegister(e)}
                sx={{ mt: 2, width: "100px" }}
              >
                {" "}
                Signup
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 2, width: "100px" }}
                onClick={(e) => handleLogin(e)}
              >
                {" "}
                Login
              </Button>
            )}
            <Typography variant="body1" mt={2}>
              {isRegisterForm ? (
                <>
                  Already have an account?<Link to="/login">Login</Link>
                </>
              ) : (
                <>
                  Dont have an account?<Link to="/register">Register</Link>
                </>
              )}
            </Typography>
          </form>
        </Paper>
      </Box>
      <ToastContainer />
    </Stack>
  );
};

export default Auth;
