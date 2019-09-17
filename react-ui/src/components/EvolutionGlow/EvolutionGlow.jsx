import React, { forwardRef } from "react";
import "./EvolutionGlow.scss";

const EvolutionGlow = forwardRef((props, ref) => (
  <div
    className="evolution-glow"
    id="evolution-glow"
    style={{ pointerEvents: "none" }}
    ref={ref}
  >
    <div className="evolution-glow__light" />
  </div>
));

export default EvolutionGlow;
