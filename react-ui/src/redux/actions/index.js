import {
  SET_DETECTION_MODEL,
  SET_CLASSIFICATION_MODEL,
  ADD_FOUND_ANIMAL,
  ADD_POINTS,
  SET_MOD,
  SET_MODS,
  ADVANCE_STAGE,
  SET_TARGET,
  SET_INITIALIZED,
  RESET,
} from "./actionTypes"

export const setDetectionModelAction = model => ({
  type: SET_DETECTION_MODEL,
  payload: model,
})

export const setClassificationModelAction = model => ({
  type: SET_CLASSIFICATION_MODEL,
  payload: model,
})

export const addFoundAnimalAction = index => ({
  type: ADD_FOUND_ANIMAL,
  payload: index,
})

export const addPointsAction = points => ({
  type: ADD_POINTS,
  payload: points,
})

export const setModAction = modData => ({
  type: SET_MOD,
  payload: modData,
})

export const setModsAction = modSelections => ({
  type: SET_MODS,
  payload: modSelections,
})

export const advanceStageAction = () => ({
  type: ADVANCE_STAGE,
})

export const setTargetAction = targetIndex => ({
  type: SET_TARGET,
  payload: targetIndex,
})

export const setInitalizedAction = () => ({
  type: SET_INITIALIZED,
})

export const resetAction = () => ({
  type: RESET,
})
