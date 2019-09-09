import { ADD_FOUND_ANIMAL } from "../actions/actionTypes"

const initialState = new Set()

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_FOUND_ANIMAL:
      return new Set(state.add(action.payload))
    default:
      return state
  }
}
