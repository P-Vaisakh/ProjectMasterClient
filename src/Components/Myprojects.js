import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  TextField,
  Divider,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { addProject } from "../service/allRequests";
import { responseContext } from "../service/Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Myprojects = () => {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");
  const { addUpdate, setAddUpdate } = useContext(responseContext);
  const [projectInput, setProjectInput] = useState({
    title: "",
    overView: "",
    github: "",
    projectImg: "",
    languages: "",
    userId: "",
    website: "",
  });
  const [preview, setPreview] = useState("");
  const setInputs = (e) => {
    const { name, value } = e.target;
    setProjectInput({ ...projectInput, [name]: value });
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleProjectAdd = async () => {
    const { title, overView, github, projectImg, languages, website } =
      projectInput;
    if (
      !title ||
      !overView ||
      !github ||
      !projectImg ||
      !languages ||
      !website
    ) {
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
      const header = {
        "Content-Type": "multipart/form-data",
        access_token: `Bearer ${token}`,
      };
      const reqBody = new FormData();

      reqBody.append("title", title);
      reqBody.append("overView", overView);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("languages", languages);
      reqBody.append("projectImg", projectImg);
      // reqBody.append("userId",user)

      const response = await addProject(reqBody, header);
      console.log(response);
      if (response.status == 200) {
        setProjectInput({
          ...projectInput,
          title: "",
          overView: "",
          github: "",
          projectImg: "",
          languages: "",
          userId: "",
          website: "",
        });
         toast.success("Project added succesfully", {
           position: "top-center",
           autoClose: 5000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
        setAddUpdate(response.data);
        setOpen(false);
      } else {
       toast.error("Project adding failed", {
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

  useEffect(() => {
    if (projectInput.projectImg) {
      setPreview(URL.createObjectURL(projectInput.projectImg));
    } else {
      setPreview("");
    }
  }, [projectInput.projectImg]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  return (
    <Box width={"100%"}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 3,
          borderTop: "1px solid black",
          pt: 2,
          borderBottom: "1px solid black",
          pb: 2,
        }}
      >
        <Typography variant="h5" color="inherit">
          My projects
        </Typography>
        <Button onClick={handleOpen} variant="contained" size="small">
          Add project
        </Button>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add project</DialogTitle>
          <Divider></Divider>
          <DialogContent>
            <Stack
              direction={{ xs: "column", md: "row" }}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              mt={3}
            >
              <Box flex={1}>
                <label htmlFor="upload">
                  <input
                    type="file"
                    id="upload"
                    onChange={(e) =>
                      setProjectInput({
                        ...projectInput,
                        ["projectImg"]: e.target.files[0],
                      })
                    }
                  />
                  <img
                    style={{ width: "100%" }}
                    src={preview ? preview : "https://placehold.co/600x400"}
                    alt=""
                  />
                </label>
              </Box>
              <Box flex={1} ml={1}>
                <TextField
                  name="title"
                  value={projectInput.title}
                  label="project name"
                  fullWidth
                  sx={{ mb: 1 }}
                  onChange={(e) => setInputs(e)}
                />
                <TextField
                  fullWidth
                  sx={{ mb: 1 }}
                  label="Technologies used"
                  value={projectInput.languages}
                  onChange={(e) => setInputs(e)}
                  name="languages"
                />
                <TextField
                  fullWidth
                  sx={{ mb: 1 }}
                  label="Github link"
                  value={projectInput.github}
                  name="github"
                  onChange={(e) => setInputs(e)}
                />
                <TextField
                  fullWidth
                  sx={{ mb: 1 }}
                  name="website"
                  label="Website link"
                  value={projectInput.website}
                  onChange={(e) => setInputs(e)}
                />
              </Box>
            </Stack>
            <Box>
              <TextField
                multiline
                rows={4}
                fullWidth
                label="Project overview"
                name="overView"
                value={projectInput.overView}
                onChange={(e) => setInputs(e)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleProjectAdd()}
              color="primary"
              variant="contained"
            >
              Add project
            </Button>
            <Button onClick={() => setOpen(false)} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Myprojects;
