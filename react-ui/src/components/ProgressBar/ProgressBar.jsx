import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar__filler"
        style={{ width: `${parseInt(progress * 100)}%` }}
      />
    </div>
  );
};

export default ProgressBar;
