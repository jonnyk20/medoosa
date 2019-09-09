import React, { useState } from "react";
import { Redirect } from "react-router";
import ShareComponent from "../../components/Share/Share";
import { useSelector, useDispatch } from "react-redux";
import { resetAction } from "../../redux/actions";

const Share = () => {
  const { stage, modSelections, initialized } = useSelector(state => ({
    stage: state.medoosa.stage,
    modSelections: state.medoosa.modSelections,
    initialized: state.initialized
  }));
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState(false);

  const reset = () => {
    dispatch(resetAction());
    setIsFinished(true);
  };

  return isFinished ? (
    <Redirect to="/" />
  ) : (
    <ShareComponent stage={stage} modSelections={modSelections} reset={reset} />
  );
};

export default Share;
