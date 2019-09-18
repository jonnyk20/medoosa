import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import {
  createStore as reduxCreateStore,
  applyMiddleware,
  compose
} from "redux";
import Share from "./containers/Share/Share";
import Play from "./containers/Play/Play";
import Start from "./containers/Start/Start";
import scatterDots from "./utils/scatterDots";
import "./App.scss";
import rootReducer from "./redux/reducers";

const logger = createLogger({
  collapsed: true
})

const composeEnhancer =
  typeof window !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const createStore = () =>
  reduxCreateStore(rootReducer, composeEnhancer(applyMiddleware(logger)));

function App() {
  useEffect(() => {
    scatterDots();
  }, []);

  return (
    <Router>
      <Provider store={createStore()}>
        <div className="App">
          <Route path="/" exact component={Start} />
          <Route path="/play" exact component={Play} />
          <Route path="/share" exact component={Share} />
        </div>
      </Provider>
    </Router>
  );
}

export default App;
