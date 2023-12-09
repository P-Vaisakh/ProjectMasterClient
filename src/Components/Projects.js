import { Box, Button, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { dltProject, getUserProjects } from "../service/allRequests";
import { Link } from "react-router-dom";
import { editResponseContext, responseContext } from "../service/Context";
import UpdateProject from "./UpdateProject";
import { Delete, GitHub } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Projects = () => {
  const [userProjects, setUserProjects] = useState([]);

  const { addUpdate } = useContext(responseContext);
  const { editUpdate } = useContext(editResponseContext);

  const getUserProject = async () => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        access_token: `Bearer ${token}`,
      };

      if (localStorage.getItem("currentId")) {
        const id = localStorage.getItem("currentId");
        const response = await getUserProjects(reqHeader, id);
        if (response.status == 200) {
          setUserProjects(response.data.userProjects);
        }
      }
    }
  };

  const handleDelete = async (id) => {
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        access_token: `Bearer ${token}`,
      };

      const response = await dltProject(id, reqHeader);
      console.log(response);
      if (response.status == 200) {
        toast.success("Item Deleted", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getUserProject();
      } else {
        toast.error("Delete failed", {
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
    getUserProject();
  }, [addUpdate, editUpdate]);

  return (
    <>
      {userProjects.length > 0 ? (
        <div>
          {userProjects.map((item, index) => (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ background: "grey" }}
              mt={2}
              py={2}
              px={2}
              key={index}
              borderRadius={"10px"}
            >
              <Typography variant="body1" sx={{ color: "white" }}>
                {item.title}
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <UpdateProject project={item} />
                <Link to={item.github} style={{ color: "white" }}>
                  <GitHub></GitHub>
                </Link>
                <Button
                  onClick={() => handleDelete(item._id)}
                  style={{ color: "white" }}
                >
                  <Delete />
                </Button>
              </Box>
            </Box>
          ))}
        </div>
      ) : (
        <p style={{textAlign:"center",marginTop:"30px"}}>No projects added yet</p>
      )}
      <ToastContainer />
    </>
  );
};

export default Projects;
