import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModAction, advanceStageAction } from "../../redux/actions";
import LevelUpComponent from "../../components/LevelUp/LevelUp";
import mods from "../../components/Mods";

const LevelUp = ({ onFinish }) => {
  const { stage, modSelections } = useSelector(state => state.medoosa);
  // const onEvolve = () => dispatch(advanceStageAction());
  const onSetMod = itemIndex => {
    dispatch(
      setModAction({
        modIndex: stage,
        itemIndex
      })
    );
    dispatch(advanceStageAction());
  };

  const dispatch = useDispatch();

  return (
    <LevelUpComponent
      items={mods[stage]}
      onSetMod={onSetMod}
      modSelections={modSelections}
      stage={stage}
      onFinish={onFinish}
    />
  );
};

export default LevelUp;