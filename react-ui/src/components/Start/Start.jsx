import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { Cycle, Touch } from "../Diagrams";

import "./Start.scss";

const Start = () => {
  return (
    <div className="start">
      <div className="start__instructions">
        <p>JellyPhil is an alien jellyfish, who needs to eat and grow</p>
      </div>
      <div className="start__cycle">
        <Cycle />
      </div>
      <div className="start__instructions">
        To help him feed, watch the aquarium video, find the fish that he's
        looking for and click where they are
      </div>
      <div className="start__touch">
        <Touch />
      </div>

      <div>
        <Link to="/play">
          <Button>Start</Button>
        </Link>
      </div>
    </div>
  );
};

export default Start;
