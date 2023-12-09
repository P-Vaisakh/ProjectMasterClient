import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { updateProfile } from "../service/allRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base } from "../service/base";
import { Link, useNavigate } from "react-router-dom";
import { GitHub, LinkedIn } from "@mui/icons-material";

const Profile = () => {
  const [update, setUpdate] = useState("");
  // modal
  const [open, setOpen] = useState(false);
  // profile image preview
  const [preview, setPreview] = useState("");
  // profile details
  const [profile, setProfile] = useState({
    userName: "",
    image: "",
    github: "",
    linkedin: "",
  });
  // jwt token
  const [token, setToken] = useState("");

  const [existingImage, setExistingImage] = useState("");

  const navigate = useNavigate();

  const handleopen = () => {
    setOpen(true);
  };

  //  set profile data onchange
  const setData = (e) => {
    const { value, name } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("currentUser"));

    if (userData) {
      setProfile({
        ...profile,
        userName: userData.userName,
        github: userData.github,
        linkedin: userData.linkedin,
      });
    
    setExistingImage(userData.profile);}
  }, [update]);

  // setting preview image in modal
  useEffect(() => {
    if (profile.image) {
      setPreview(URL.createObjectURL(profile.image));
    } else {
      setPreview("");
    }
  }, [profile.image]);

  // function for updating profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    const { userName, image, github, linkedin } = profile;
    if (!userName) {
      alert("all fields are required");
    } else {
      if (localStorage.getItem("currentId")) {
        const id = localStorage.getItem("currentId");

        //header for token verification
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          access_token: `Bearer ${token}`,
        };

        // body with details to be updated
        const reqBody = new FormData();
        reqBody.append("userName", userName);
        reqBody.append("profile", image ? image : existingImage);
        reqBody.append("github", github);
        reqBody.append("linkedin", linkedin);

        // update api
        const response = await updateProfile(reqBody, reqHeader, id);

        if (response.status == 200) {
          toast.success("Profile updated succesfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // get data after updation
          localStorage.setItem("currentUser", JSON.stringify(response.data));
          setUpdate(response.data);
          setOpen(false);
        } else {
          console.log(response);
        }
      }
    }
  };

  // getting profile data on mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, [token]);

  return (
    <Box
      flex={0.5}
      textAlign={"center"}
      border={"1px solid black"}
      borderRadius={"10px"}
      paddingX={"10px"}
      py={"20px"}
      mb={"20px"}
    >
      <Typography variant="h5" color="inherit">
        My profile
      </Typography>
      {existingImage != "" ? (
        <div
          style={{
            borderRadius: "50%",
            height: "300px",
            width: "300px",
            display: "block",
            margin: "auto",
            marginTop: "30px",
          }}
        >
          <img src={`${base}/uploads/${existingImage}`} alt="" width={"100%"} />
        </div>
      ) : (
        <img src="/img/profile.png" alt="" width={"100%"} />
      )}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Typography sx={{ mb: 1 }} variant="h5">
          {profile.userName}
        </Typography>
        {profile.github && (
          <Link to={profile.github} style={{ marginRight: 1 }}>
            <GitHub></GitHub>
          </Link>
        )}
        {profile.linkedin && (
          <Link to={profile.linkedin} color="#272727">
            <LinkedIn style={{ marginLeft: 1 }}></LinkedIn>
          </Link>
        )}
        <br />
        <Button
          onClick={handleopen}
          variant="contained"
          size="small"
          sx={{ mt: 1 }}
        >
          {" "}
          Edit
        </Button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <label htmlFor="img1">
            {existingImage != "" ? (
              <img
                src={preview ? preview : `${base}/uploads/${existingImage}`}
                width={"50%"}
                height={"50%"}
              />
            ) : (
              <img src={preview ? preview : "/img/profile.png"} alt="" />
            )}
          </label>
          <input
            type="file"
            id="img1"
            onChange={(e) =>
              setProfile({ ...profile, ["image"]: e.target.files[0] })
            }
          />
          <div
            style={{
              marginTop: "3px",
              width: "70%",
              height: "40px",
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="edituname" style={{ marginRight: "4px" }}>
              UserName:
            </label>
            <input
              style={{
                flex: 1,
                height: "40px",
              }}
              type="text"
              id="edituname"
              name="userName"
              defaultValue={profile.userName}
              onChange={(e) => setData(e)}
            />
          </div>
          <div
            style={{
              marginTop: "3px",
              width: "70%",
              height: "40px",
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="github" style={{ marginRight: "4px" }}>
              Github:
            </label>
            <input
              style={{
                flex: 1,
                height: "40px",
              }}
              type="text"
              name="github"
              id="github"
              defaultValue={profile.github}
              onChange={(e) => setData(e)}
            />
          </div>
          <div
            style={{
              marginTop: "3px",
              width: "70%",
              height: "40px",
              alignSelf: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label htmlFor="linkedin" style={{ marginRight: "4px" }}>
              Linkedin:
            </label>
            <input
              style={{
                flex: 1,
                height: "40px",
              }}
              name="linkedin"
              type="text"
              id="linkedin"
              defaultValue={profile.linkedin}
              onChange={(e) => setData(e)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleUpdate(e)}
          >
            Update Profile
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
};

export default Profile;
