import {
  SET_MOD,
  SET_MODS,
  ADVANCE_STAGE,
  SET_STAGE,
  RESET
} from "../actions/actionTypes";

const initialState = {
  name: "Medoosa",
  stage: 5,
  modSelections: [
    {
      name: "color",
      value: 0
    },
    {
      name: "eyes",
      value: 0
    },
    {
      name: "mouth",
      value: 0
    },
    {
      name: "arms",
      value: 0
    },
    {
      name: "head",
      value: 0
    }
  ]
};

const updateMod = (state, newSelection) => {
  console.log('SETTING MOD', newSelection)
  const modSelections = state.modSelections.map((mod, i) =>
    i === newSelection.modIndex
      ? { ...mod, value: newSelection.itemIndex }
      : mod
  );
  return { ...state, modSelections };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MOD:
      return updateMod(state, action.payload);
    case SET_MODS:
      return { ...state, modSelections: action.payload };
    case ADVANCE_STAGE:
      return { ...state, stage: state.stage + 1 };
    case RESET:
      return { ...state, stage: 0 };
    case SET_STAGE:
      return { ...state, stage: action.payload };
    default:
      return state;
  }
};
