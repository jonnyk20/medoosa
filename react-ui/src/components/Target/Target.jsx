import React, { forwardRef } from "react";
import fish from "../Fish";

import "./Target.scss";

const Target = forwardRef(({ target }, ref) => {
  const FishComponent = fish[target];

  return (
    <div className="target-container" ref={ref}>
      <div className="target">
        <FishComponent />
      </div>
    </div>
  );
});

export default Target;
