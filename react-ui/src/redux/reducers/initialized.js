import { SET_INITIALIZED, RESET } from "../actions/actionTypes"

const intialState = false

export default (state = intialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return true
    case RESET:
      return false
    default:
      return state
  }
}
