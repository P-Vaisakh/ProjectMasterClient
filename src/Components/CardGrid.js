import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHomeProjects } from "../service/allRequests";
import ProjectCard from "./ProjectCard";

const CardGrid = () => {
  const [homeProjects, setHomeProjeccts] = useState([]);

  const getHomeprojects = async () => {
    const response = await getHomeProjects();
    setHomeProjeccts(response.data.homeProjects);
  };

  useEffect(() => {
    getHomeprojects();
  }, []);

  return (
    <>
      {homeProjects.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 1.5, md: 3 }}
          justifyContent={"center"}
          mb={7}
        >
          {homeProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </Grid>
      ) : (
        <p style={{ padding: "30px" }}>no projects to show</p>
      )}

      {homeProjects.length > 0 && (
        <Link to={"/projects"} style={{ marginBottom: "30px" }}>
          See all Projects
        </Link>
      )}
    </>
  );
};

export default CardGrid;
