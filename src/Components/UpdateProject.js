import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { base } from "../service/base";
import { updateProject } from "../service/allRequests";
import { editResponseContext } from "../service/Context";
import { Edit } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProject = ({ project }) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [projectInput, setProjectInput] = useState({
    title: project.title,
    overView: project.overView,
    github: project.github,
    projectImg: "",
    languages: project.languages,
    userId: project.userId,
    website: project.website,
  });

  const { setEditUpate } = useContext(editResponseContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleUpdate = async () => {
    console.log("hi");
    const { title, languages, github, website, overView, projectImg } =
      projectInput;
    if (!title || !languages || !github || !website || !overView) {
      alert("all fields");
    } else {
      const reqBody = new FormData();

      reqBody.append("title", title);
      reqBody.append("overView", overView);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("languages", languages);
      preview
        ? reqBody.append("projectImg", projectImg)
        : reqBody.append("projectImg", project.projectImg);

      const token = localStorage.getItem("token");

      var header = {};
      if (preview) {
        header = {
          "Content-Type": "multipart/form-data",
          access_token: `Bearer ${token}`,
        };
      } else {
        header = {
          "Content-Type": "application/json",
          access_token: `Bearer ${token}`,
        };
      }
      const id = project._id;
      const response = await updateProject(id, reqBody, header);
      if (response.status == 200) {
      toast.success("Project updated succesfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
        setEditUpate(response.data);
        setOpen(false);
      } else {
        alert("fail");
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

  return (
    <div>
      <Button onClick={handleOpen} style={{ color: "white" }}>
        <Edit></Edit>
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add project</DialogTitle>
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
                  src={
                    preview ? preview : `${base}/uploads/${project.projectImg}`
                  }
                  alt=""
                />
              </label>
            </Box>
            <Box flex={1}>
              <TextField
                fullWidth
                sx={{ mb: 1 }}
                name="title"
                label="project name"
                value={projectInput.title}
                onChange={(e) =>
                  setProjectInput({
                    ...projectInput,
                    ["title"]: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                sx={{ mb: 1 }}
                value={projectInput.languages}
                label="Language used"
                onChange={(e) =>
                  setProjectInput({
                    ...projectInput,
                    ["languages"]: e.target.value,
                  })
                }
                name="languages"
              />
              <TextField
                fullWidth
                sx={{ mb: 1 }}
                value={projectInput.github}
                label="Github link"
                name="github"
                onChange={(e) =>
                  setProjectInput({
                    ...projectInput,
                    ["github"]: e.target.value,
                  })
                }
              />
              <TextField
                fullWidth
                sx={{ mb: 1 }}
                value={projectInput.website}
                name="website"
                label="Website link"
                onChange={(e) =>
                  setProjectInput({
                    ...projectInput,
                    ["website"]: e.target.value,
                  })
                }
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
              onChange={(e) =>
                setProjectInput({
                  ...projectInput,
                  ["overView"]: e.target.value,
                })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={(e) => handleUpdate(e)}
            variant="contained"
          >
            Add project
          </Button>
          <Button color="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default UpdateProject;
