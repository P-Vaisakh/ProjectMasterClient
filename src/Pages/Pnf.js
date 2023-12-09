import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Pnf = () => {
  return (
    <div style={{ height: "100vh", width: "100%", position: "relative" }}>
      <img
        src="/img/pnf.png"
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
      <Link to={"/"} style={{ color: "white", textDecoration: "none" }}>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "transparent",
            top: 0,
            left: 0,
            display: "flex",
            marginTop:"30px",
            justifyContent: "center",
          }}
        >Click somewhere to go back home.</div>
      </Link>
    </div>
  );
};

export default Pnf;
