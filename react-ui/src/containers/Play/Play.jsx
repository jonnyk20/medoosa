import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PlayComponent from "../../components/Play/Play";
import formatFrames from "../../utils/formatFrames";
import video1Frames from "../../data/frames/video1";
import { addFoundAnimalAction, advanceStageAction } from "../../redux/actions";
import getFilteredTargetList from "../../data/getFilteredTargetList";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import {
  setModsAction,
  setTargetAction,
  setInitalizedAction
} from "../../redux/actions";
import { getRandomItem } from "../../utils";
import mods from "../../components/Mods";

const getRandomIndex = arr => Math.floor(Math.random() * arr.length);
const initialValues = mods.map(getRandomIndex);

const PlayContainer = () => {
  const {
    stage,
    modSelections,
    animals,
    target,
    foundAnimals,
    initialized
  } = useSelector(state => ({
    detectionModelLoaded: !!state.models.detectionModel,
    stage: state.medoosa.stage,
    modSelections: state.medoosa.modSelections,
    animals: state.animals,
    target: state.target,
    foundAnimals: state.foundAnimals,
    initialized: state.initialized
  }));
  const dispatch = useDispatch();

  const frames = formatFrames(video1Frames);
  const targetAnimal = stage < 5 ? animals[target] : null;

  const onHitTarget = hitTargetIndex => {
    dispatch(addFoundAnimalAction(hitTargetIndex));
    const animalsToIgnore = [...Array.from(foundAnimals), hitTargetIndex];
    const availableAnimals = getFilteredTargetList(animalsToIgnore);
    const nextAnimal = getRandomItem(availableAnimals);
    // if (stage < 5) {
    //   dispatch(advanceStageAction());
    // }
    if (stage < 4) {
      dispatch(setTargetAction(nextAnimal));
    }
  };

  useEffect(() => {
    if (!initialized) {
      const initialTarget = getRandomItem(getFilteredTargetList());
      const initialModsSelections = modSelections.map((selection, i) => ({
        ...selection,
        value: initialValues[i]
      }));
      if (stage < 5) {
        dispatch(setTargetAction(initialTarget));
      }
      dispatch(setModsAction(initialModsSelections));
      dispatch(setInitalizedAction());
    }
  }, []);

  return initialized ? (
    <PlayComponent
      stage={stage}
      modSelections={modSelections}
      frames={frames}
      targetAnimal={targetAnimal}
      onHitTarget={onHitTarget}
    />
  ) : (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <LoadingSpinner />
    </div>
  );
};

export default PlayContainer;
