import React, { useState, useRef, useEffect } from "react";
import { MdDone, MdExpandLess } from "react-icons/md";
import { Link } from "react-router-dom";
import { colors } from "../Mods/colors";
import Body from "../Body";
import Carousel from "../Carousel/Carousel";
import Button from "../Button/Button";
import EvolutionGlow from "../EvolutionGlow/EvolutionGlow";
import { makeCanvas, explode } from "../../utils";
import "./LevelUp.scss";

const LevelUp = ({
  items,
  onFinish,
  onSetMod,
  modSelections,
  stage,
  particleCanvasRef,
  onEvolve
}) => {
  const [isEvolved, setIsEvolved] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);
  const [animationCanvas, setAnimationCanvas] = useState(null);
  const glowRef = useRef();
  const animationRef = useRef();

  useEffect(() => {
    if (animationRef.current && !animationCanvas) {
      const getCanvas = async () => {
        const canvas = await makeCanvas(animationRef.current,  {
          backgroundColor: "skyblue",
          height: 250,
          width: 250
      });
        setAnimationCanvas(canvas);
      };
      getCanvas();
    }
  }, [animationRef.current]);

  const evolve = () => {
    if (!isEvolving && animationCanvas) {
      setIsEvolving(true);
      setTimeout(() => {
        onEvolve();
      }, 1500);
      setTimeout(() => {
        setIsEvolved(true);
        explode(animationCanvas, glowRef.current, particleCanvasRef.current);
      }, 2000);
    }
  };

  const color = colors[modSelections[0].value];

  return (
    <div className="level-up">
      <div className="level-up__avatar">
        <EvolutionGlow ref={animationRef} hidden />
        <Body
          stage={stage}
          modSelections={modSelections}
          onClick={stage < 5 ? evolve : () => {}}
          isLevelUpPending={!isEvolved}
        />
        {(isEvolving || isEvolved) && <EvolutionGlow ref={glowRef} />}
      </div>
      {!isEvolving && !isEvolved && (
        <div className="level-up__selection">
          {!isEvolved && !isEvolving && (
            <div>
              Choose your{" "}
              {modSelections[stage] ? modSelections[stage].name : "mod"}, them
              tap on you Jellyphil to evolve
            </div>
          )}
          <div className="icon">
            <MdExpandLess />
          </div>

          <Carousel
            items={items}
            afterChange={onSetMod}
            initialSlide={(modSelections[stage] || {}).value}
            itemsToShow={stage === 4 ? 1 : 3}
            color={color}
          />
        </div>
      )}
      <div className="level-up__confirmation">
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
