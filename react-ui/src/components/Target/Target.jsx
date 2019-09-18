import React, { forwardRef } from "react";
import fish from "../Fish";

import "./Target.scss";

const Target = forwardRef((props, ref) => {
  const FishComponent = fish[0];

  return (
    <div className="target-container" ref={ref}>
      <div className="target">
        <FishComponent />
      </div>
    </div>
  );
});

export default Target;
