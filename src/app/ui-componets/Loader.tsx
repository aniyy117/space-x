// react
import React, { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 10rem)",
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default memo(Loader);
