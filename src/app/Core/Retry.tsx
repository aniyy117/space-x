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
        flexDirection: "column",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 999,
        cursor: "pointer",
      }}
    >
      <ReplayIcon />
    </div>
  );
};

export default Retry;
