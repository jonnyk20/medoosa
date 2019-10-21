import React, { useState } from "react";
import Button from "../Button/Button";
import { colors } from "../Mods/colors";
import Body from "../Body";
import Carousel from "../Carousel/Carousel";
import "./Test.scss";

const Test = ({ mods, modSelections, stage, onSetMod, onSetStage }) => {
  const [modType, setModType] = useState(0);
  const color = colors[modSelections[0].value];
  const afterChange = (prev, itemIndex) => {
    console.log('BEFORE CHANGE', modType, prev, itemIndex)
    onSetMod({
      modIndex: modType,
      itemIndex
    });
  };

  return (
    <div className="test">
      <div className="test__avatar">
        <Body stage={stage} modSelections={modSelections} />
      </div>
      <div className="test__mod-selection">
        <Carousel
          items={mods[modType]}
          afterChange={afterChange}
          initialSlide={(modSelections[stage] || {}).value}
          itemsToShow={stage === 4 ? 1 : 3}
          color={color}
        />
      </div>
      <div className="test__mod-type-selection" style={{ marginBottom: 20 }}>
        {["color", "eyes", "mouth", "arms", "head"].map((type, i) => (
          <Button key={type} onClick={() => setModType(i)}>
            {type}
          </Button>
        ))}
      </div>
      <div className="test__stage-selection">
        {[0, 1, 2, 3, 4, 5].map(num => (
          <Button key={num} onClick={() => onSetStage(num)}>
            {num}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Test;
