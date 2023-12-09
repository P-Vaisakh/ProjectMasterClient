import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import TextField from "@mui/material/TextField";
import { Container, Grid, Typography } from "@mui/material";
import { getAllProjects } from "../service/allRequests";
import ProjectCard from "../Components/ProjectCard";

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchData, setSearchdata] = useState("");

  const getProjects = async () => {
    try {
      const response = await getAllProjects(searchData);
      setProjects(response.data.allProjects);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProjects();
  }, [searchData]);

  return (
    <div>
      <Header></Header>
      <Container
        sx={{
          pt: 15,
          textAlign: "center",
          fontWeight: "700",
          minHeight: "100vh",
        }}
      >
        <Typography
          variant="h4"
          color="initial"
          fontFamily={"montserrat"}
          mb={2}
        >
          All Projects
        </Typography>
        <TextField
          sx={{ width: { md: "450px" }, mt: 2, mb: 2 }}
          label="Search a Project by technologies used..."
          onChange={(e) => setSearchdata(e.target.value)}
        />
        {projects.length > 0 ? (
          <Grid
            container
            spacing={{ xs: 1.5, md: 3 }}
            justifyContent={"center"}
            mb={7}
          >
            {projects.map((item, ind) => (
              <ProjectCard project={item} key={ind} />
            ))}
          </Grid>
        ) : (
          <p>no projects to show</p>
        )}
      </Container>
    </div>
  );
};

export default AllProjects;
