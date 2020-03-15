import { SET_TARGET } from "../actions/actionTypes"

const intialState = 0

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_TARGET:
      return action.payload
    default:
      return state
  }
}
