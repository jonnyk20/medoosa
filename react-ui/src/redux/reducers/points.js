import { ADD_POINTS } from "../actions/actionTypes"

const initialState = 0

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POINTS:
      return state + action.payload
    default:
      return state
  }
}
