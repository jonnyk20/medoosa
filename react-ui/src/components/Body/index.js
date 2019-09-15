import React, { forwardRef } from "react";
import { colors } from "../Mods/colors";
import Aura from "../Aura/Aura";
import Egg from "./Egg/Egg";
import Planula from "./Planula/Planula";
import Polyp from "./Polyp/Polyp";
import Ephyra from "./Ephyra/Ephyra";
import Medusa from "./Medusa/Medusa";
import FinalForm from "./FinalForm/FinalForm";
import "./Body.scss";

const bodies = [Egg, Planula, Polyp, Ephyra, Medusa, FinalForm];

const BodyComponent = forwardRef(
  ({ stage = 0, modSelections, isLevelUpPending, onClick = () => {} }, ref) => {
    const Body = bodies[stage];
    const color = colors[modSelections[0].value];
    const aura = isLevelUpPending ? <Aura /> : null;

    return (
      <div
        className={`body ${isLevelUpPending ? "body--clickable" : ""}`}
        style={{ color }}
        ref={ref}
        onClick={onClick}
      >
        <Body modSelections={modSelections} aura={aura} />
      </div>
    );
  }
);

export default BodyComponent;
