import React, { forwardRef } from "react";
import "./EvolutionGlow.scss";
import { MdAutorenew } from "react-icons/md";

const EvolutionGlow = forwardRef(({ hidden }, ref) => {
  return (
  <div
    className="evolution-glow"
    id="evolution-glow"
    style={{
      top: hidden ? '-1000px' : 'auto'
    }}
    ref={ref}
  >
    <div className="evolution-glow__light" />
  </div>
)});

export default EvolutionGlow;
