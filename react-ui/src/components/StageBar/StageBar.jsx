import React, { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import "./StageBar.scss";

const StageBar = ({ stage, levelUpPending, onStartLevelUp, isLevelingUp }) => {
  const [currentStage, setCurrentStage] = useState(stage);
  const [isPulsing, setIsPulsing] = useState(stage);
  const nextStage = currentStage + 1;

  const handleClick = num => {
    if (num === stage + 1 && levelUpPending) {
      onStartLevelUp();
    }
  };

  useEffect(() => {
    if (!isLevelingUp && !levelUpPending) {
      setCurrentStage(stage);
    }
  }, [stage, isLevelingUp]);

  useEffect(() => {
    if (levelUpPending) {
      setTimeout(() => {
        setIsPulsing(true);
      }, 2000);
    } else {
      setIsPulsing(false);
    }
  }, [levelUpPending]);

  const renderStageIcon = num => {
    let modifierClass = "";

    if (num <= currentStage) {
      modifierClass = "stage-icon--current";
    }

    if (levelUpPending && num === nextStage && isPulsing) {
      modifierClass = "stage-icon--next";
    }

    if (isLevelingUp && num === nextStage) {
      modifierClass = "stage-icon--current";
    }

    return (
      <div
        key={`stage-${num}`}
        className={`stage-icon ${modifierClass}`}
        onClick={() => handleClick(num)}
      >
        {num}
      </div>
    );
  };

  return (
    <div className="stage-bar">
      <div className="stage-bar__bar">
        <ProgressBar
          progress={
            levelUpPending || isLevelingUp ? nextStage / 5 : currentStage / 5
          }
        />
      </div>
      <div className="stage-bar__icons">
        {[0, 1, 2, 3, 4, 5].map(renderStageIcon)}
      </div>
    </div>
  );
};

export default StageBar;
