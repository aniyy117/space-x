import React from "react";
import ReplayIcon from "@mui/icons-material/Replay";

interface RetryProps {
  onClick: any;
}
const Retry = (props: RetryProps) => {
  const { onClick } = props;
  return (
    <div
      className="retry"
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 10rem)",
      }}
    >
      <ReplayIcon />
    </div>
  );
};

export default Retry;
