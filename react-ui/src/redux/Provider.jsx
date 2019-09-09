import React from "react"
import { Provider } from "react-redux"
import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose,
} from "redux"

import logger from "redux-logger"
import rootReducer from "./reducers"

// const composeEnhancer =
//   typeof window !== "undefined"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : compose

// const createStore = () =>
//   reduxCreateStore(rootReducer, composeEnhancer(applyMiddleware(logger)))

const createStore = () =>
  reduxCreateStore(rootReducer /*, applyMiddleware(logger) */)

export default ({ element }) => (
  <Provider store={createStore()}>{element}</Provider>
)
