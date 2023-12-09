import { GitHub, InsertLink } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { base } from "../service/base";
import { Link } from "react-router-dom";

const ellipsisAfterTwoLinesStyle = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  WebkitLineClamp: 2,
};

const ProjectCard = ({ project }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Grid item xs={10} md={4} lg={3}>
        <Card
          onClick={() => handleClickOpen()}
          sx={{ borderRadius: "10px", textAlign: "start", minHeight: "280px" }}
        >
          <CardMedia title="img" sx={{ height: "160px" }}>
            <img
              src={`${base}/uploads/${project.projectImg}`}
              width={"100%"}
              height={"100%"}
              style={{ objectFit: "cover" }}
              alt=""
            />
          </CardMedia>
          <CardContent sx={{ p: { xs: 0.8, md: 1.3 } }}>
            <Typography variant="h6" color="inherit" fontFamily={"Montserrat"}>
              {project.title}
            </Typography>
            <Typography
              variant={"subtitle1"}
              color="GrayText"
              lineHeight={1.45}
              mt={{ md: 1, xs: 0.5 }}
              fontSize={{ md: "16px" }}
              style={ellipsisAfterTwoLinesStyle}
            >
              {project.overView}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <DialogTitle sx={{ p: 0, m: 0 }}>
            <Typography variant="h5" color="initial" fontFamily={"montserrat"}>
              {project.title}
            </Typography>
          </DialogTitle>
          <Divider></Divider>
          <Stack
            direction={{ xs: "column", md: "row" }}
            gap={2}
            alignItems={"center"}
            justifyContent={"center"}
            my={2}
          >
            <Box flex={1} height={"100%"} alignContent={"center"}>
              <img
                src={`${base}/uploads/${project.projectImg}`}
                alt=""
                width={"100%"}
                height={"100%"}
              />
            </Box>
            <Box flex={1} alignSelf={"start"}>
              <Typography
                variant="body1"
                color="initial"
                mt={1}
                fontFamily={"montserrat"}
              >
                {project.overView}
              </Typography>
              <Box
                mt={1.5}
                display={"flex"}
                flexWrap={"wrap"}
                gap={1}
                justifyContent={"start"}
                alignItems={"center"}
              >
                {project.languages
                  .split(/[\s,]+/)
                  .map((item, i) =>
                    item.length < 1 ? (
                      ""
                    ) : (
                      <Chip label={item} key={i} color="primary"></Chip>
                    )
                  )}
              </Box>
            </Box>
          </Stack>
          <Divider></Divider>
          <Box>
            <Link to={project.github}>
              <IconButton color="inherit">
                {" "}
                <GitHub></GitHub>
              </IconButton>
            </Link>
            <Link to={project.website}>
              <IconButton color="inherit">
                {" "}
                <InsertLink></InsertLink>
              </IconButton>
            </Link>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
