import React, { forwardRef } from "react";
import "./EvolutionGlow.scss";

const EvolutionGlow = forwardRef(({ hidden }, ref) => {
  return (
  <div
    className="evolution-glow"
    id="evolution-glow"
    style={{
      top: hidden ? '-1000px' : 'auto',
      background: "skyblue",
      height: '300px',
      width: '300px',
    }}
    ref={ref}
  >
    <div className="evolution-glow__light" />
  </div>
)});

export default EvolutionGlow;
