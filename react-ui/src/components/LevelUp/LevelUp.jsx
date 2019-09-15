import React, { useState, useRef } from "react";
import { MdDone, MdExpandMore, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import Body from "../Body";
import Carousel from "../Carousel/Carousel";
import Button from "../Button/Button";
import EvolutionGlow from "../EvolutionGlow/EvolutionGlow";
import { explode } from "../../utils";
import "./LevelUp.scss";

const LevelUp = ({ items, onFinish, onSetMod, modSelections, stage }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isEvolved, setIsEvolved] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);
  const glowRef = useRef();

  const evolve = () => {
    if (!isEvolving) {
      setIsEvolving(true);
      setTimeout(() => {
        onSetMod(selectedItem);
        explode(glowRef.current);
      }, 1500);
      setTimeout(() => {
        setIsEvolved(true);
      }, 2000);
    }
  };

  return (
    <div className="level-up">
      <div className="level-up__avatar">
        <Body
          stage={stage}
          modSelections={modSelections}
          onClick={stage < 5 ? evolve : () => {}}
          isLevelUpPending={!isEvolved}
        />
        {isEvolving && <EvolutionGlow ref={glowRef} />}
      </div>
      {!isEvolving && !isEvolved && (
        <div className="level-up__selection">
          <div className="icon">
            <MdExpandMore />
          </div>

          <Carousel
            items={items}
            afterChange={setSelectedItem}
            initialSlide={(modSelections[stage] || {}).value}
            itemsToShow={stage === 4 ? 1 : 3}
          />
        </div>
      )}
      <div className="level-up__confirmation">
        {!isEvolved && !isEvolving && (
          <div>
            Choose your{" "}
            {modSelections[stage] ? modSelections[stage].name : "mod"}, them tap
            on your meoodosa to evolve
          </div>
        )}
        {isEvolved && stage < 5 && (
          <Button onClick={onFinish}>
            <MdDone />
          </Button>
        )}

        {isEvolved && stage >= 5 && (
          <Link to="/share">
            <Button>Finish</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LevelUp;
