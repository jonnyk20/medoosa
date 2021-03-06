import React, { useState } from "react";
import { Redirect } from "react-router";
import ShareComponent from "../../components/Share/Share";
import { useSelector, useDispatch } from "react-redux";
import { resetAction } from "../../redux/actions";

const Share = () => {
  const { stage, modSelections } = useSelector(state => ({
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

  return isFinished || stage < 5 ? (
    <Redirect to="/" />
  ) : (
    <ShareComponent stage={stage} modSelections={modSelections} reset={reset} />
  );
};

export default Share;
