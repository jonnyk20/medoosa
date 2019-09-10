import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

import Body from "../Body";
import "./Start.scss";

const Start = () => {
  return (
    <div className="start">
      <div className="start__instructions">Find all the fish</div>
      <div>This is the video svg</div>
      <div>These are the instructions for the vide</div>
      <div>Level up explanation</div>
      <div>Level up diagram</div>
      <div>
        <Link to="/play">
          <Button>Start</Button>
        </Link>
      </div>
    </div>
  );
};

export default Start;
