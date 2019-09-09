import {
  SET_DETECTION_MODEL,
  SET_CLASSIFICATION_MODEL,
} from "../actions/actionTypes"

const initialState = {
  detectionModel: null,
  classificationModel: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DETECTION_MODEL:
      return { ...state, detectionModel: action.payload }
    case SET_CLASSIFICATION_MODEL:
      return { ...state, classificationModel: action.payload }
    default:
      return state
  }
}
