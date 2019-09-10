import React, { useState } from "react";
import { MdDone, MdExpandMore, MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import Body from "../Body";
import Carousel from "../Carousel/Carousel";
import Button from "../Button/Button";
import EvolutionGlow from "../EvolutionGlow/EvolutionGlow";
import "./LevelUp.scss";

const LevelUp = ({ items, onFinish, onSetMod, modSelections, stage }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [isEvolved, setIsEvolved] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);
  const handleClick = () => {
    if (isEvolving) {
      return;
    }
    if (isEvolved) {
      onFinish();
      return;
    }
    setIsEvolving(true);
    setTimeout(() => {
      onSetMod(selectedItem);
    }, 1500);
    setTimeout(() => {
      setIsEvolved(true);
      setIsEvolving(false);
    }, 3000);
  };

  return (
    <div className="level-up">
      <div className="level-up__avatar">
        <Body stage={stage} modSelections={modSelections} />
        {isEvolving && <EvolutionGlow />}
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
        {stage < 5 && (
          <Button onClick={handleClick}>
            {isEvolved ? <MdArrowBack /> : <MdDone />}
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
