import React, { useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./StageBar.scss";

const StageBar = ({ stage, levelUpPending, onStartLevelUp }) => {
  const [progress, setProgress] = useState(0.5);
  const handleClick = num => {
    if (num === stage + 1 && levelUpPending) {
      onStartLevelUp();
    }
  };

  const renderStageIcon = num => {
    return (
      <div
        key={`stage-${num}`}
        className="stage-icon"
        onClick={() => handleClick(num)}
      >
        {num}
      </div>
    );
  };

  return (
    <div className="stage-bar">
      <div className="stage-bar__bar">
        <ProgressBar progress={levelUpPending ? (stage + 1) / 4 : stage / 4} />
      </div>
      <div className="stage-bar__icons">
        {[0, 1, 2, 3, 4].map(renderStageIcon)}
      </div>
    </div>
  );
};

export default StageBar;
