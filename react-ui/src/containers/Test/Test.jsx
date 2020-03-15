import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModAction, setStageAction } from "../../redux/actions";
import mods from "../../components/Mods";
import TestComponent from "../../components/Test/Test";

const Test = () => {
  const { stage, modSelections } = useSelector(state => state.medoosa);

  const onSetMod = ({ modIndex, itemIndex }) => {
    dispatch(
      setModAction({
        modIndex,
        itemIndex
      })
    );
  };

  const onSetStage = stage => {
    dispatch(setStageAction(stage));
  };

  const dispatch = useDispatch();
  return (
    <TestComponent
      mods={mods}
      onSetMod={onSetMod}
      onSetStage={onSetStage}
      modSelections={modSelections}
      stage={stage}
    />
  );
};

export default Test;
