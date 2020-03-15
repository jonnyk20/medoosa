import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Customize from "../../components/Customize/Customize";
import { setModAction, advanceStageAction } from "../../redux/actions";
import mods from "../../components/Mods";
import Evolution from "../../components/Evolution/Evolution";

const CustomizeContainer = () => {
  const [isEvolving, setIsEvolving] = useState(false);

  const dispatch = useDispatch();
  const { stage, modSelections } = useSelector(state => state.medoosa);
  const goHome = () => console.log("GOING HOME");

  const onEvolve = () => dispatch(advanceStageAction());

  const onConfirm = itemIndex => {
    dispatch(
      setModAction({
        modIndex: 0,
        itemIndex
      })
    );
    setIsEvolving(true);
  };

  return (
    <Fragment>
      <Customize
        items={mods[stage]}
        onConfirm={onConfirm}
        modSelections={modSelections}
        stage={stage}
      />
      {/* {isEvolving && (
        <Evolution
          onClose={goHome}
          onEvolve={onEvolve}
          modSelections={modSelections}
          stage={stage}
        />
      )} */}
    </Fragment>
  );
};

export default CustomizeContainer;
