import React, { useState, useRef, useEffect } from "react";
import YouTube from "react-youtube";
import "./Play.scss";
import Box from "../Box/Box";
import Body from "../Body";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Spot from "../Spot/Spot";
import EvolutionGlow from "../EvolutionGlow/EvolutionGlow";
import SpottingConfirmation from "../SpottingConfirmation/SpottingConfirmation";
import { getVideoDimensions } from "../../utils";

const videoId = "4a2cSvTph0M";

const argMax = array =>
  [].map
    .call(array, (x, i) => [x, i])
    .reduce((r, a) => (a[0] > r[0] ? a : r))[1];

const getClassification = arr => {
  if (arr.length === 0) {
    return {
      label: "nothing",
      index: -1
    };
  }

  const labelIndex = argMax(arr);
  const score = arr[labelIndex];

  return {
    labelIndex,
    score
  };
};

const radius = 25;
const isBeingClicked = (bounds, box, clickTarget) => {
  const { top, left } = bounds;
  const boxLeft = left + box.left;
  const boxRight = boxLeft + box.width;
  const boxTop = top + box.top;
  const boxBottom = boxTop + box.height;
  const { clientX, clientY } = clickTarget;

  const isWithinX = clientX + radius >= boxLeft && clientX - radius <= boxRight;
  const iswithinY = clientY + radius >= boxTop && clientY - radius <= boxBottom;
  const isWithinBounds = isWithinX && iswithinY;
  return isWithinBounds;
};

const introContent = (
  <div className="play__intro">
    <div className="text-box">
      <p className="brand-text">Help me find my friends.</p>
      <p>Start the video and then tap or click the fish to spot them.</p>
    </div>
  </div>
);

const Play = ({ frames, stage, modSelections, targetAnimal, onHitTarget }) => {
  const [video, setVideo] = useState(null);
  const [videoDimensions, setVideoDimensions] = useState({});
  const [targetBoxes, setTargetBoxes] = useState([]);
  const [spot, setSpot] = useState(null);
  const [isEvolving, setIsEvolving] = useState(false);
  const [playerState, setPlayerState] = useState(-1);
  const [isConfirming, setIsConfirming] = useState(false);
  // -1 – unstarted
  // 0 – ended
  // 1 – playing
  // 2 – paused
  // 3 – buffering
  // 5 – video cued
  const videoRef = useRef();
  const componentIsMounted = useRef(true);

  useEffect(() => {
    const dimensions = getVideoDimensions(window.innerWidth);
    setVideoDimensions(dimensions);
  }, []);

  const { width: videoWidth, height: videoHeight } = videoDimensions;

  const opts = {
    height: videoHeight,
    width: videoWidth,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      // autoplay: 1,
      loop: 1,
      playlist: videoId,
      enablejsapi: 1,
      origin: "https://medoosa.netlify.com/",
      playsinline: 1
    }
  };

  const onReady = e => {
    const vid = e.target;
    setVideo(vid);
  };

  const handleClick = e => {
    const { clientX, clientY } = e;
    if (isConfirming || isEvolving || !!spot) {
      return;
    }
    const time = video.getCurrentTime();
    const frames = Math.floor(time * 5);
    drawBoxes(frames + 1, { clientX, clientY });
  };

  const drawBoxes = (frameIndex, { clientX, clientY }) => {
    const { current: canvas } = videoRef;
    const OK = canvas.getBoundingClientRect();

    const frameObject = frames[frameIndex];
    const boxes = frameObject ? frameObject.formattedBoxes : [];

    let boxesToRender = [];
    boxes.forEach((item, i) => {
      const topBox = item.coordinates;
      const { labelIndex, score } = getClassification(item.classification);
      const topLeft = [topBox[1] * videoWidth, topBox[0] * videoHeight];
      const bottomRight = [topBox[3] * videoWidth, topBox[2] * videoHeight];
      const boxW = bottomRight[0] - topLeft[0];
      const boxH = bottomRight[1] - topLeft[1];
      const boxX = topLeft[0];
      const boxY = topLeft[1];
      const boxCoords = {
        left: boxX,
        top: boxY,
        height: boxH,
        width: boxW
      };
      const shouldRender = isBeingClicked(OK, boxCoords, { clientX, clientY });

      if (shouldRender) {
        const isTarget = labelIndex === targetAnimal.id;
        boxesToRender.push({
          left: boxX,
          top: boxY,
          height: boxH,
          width: boxW,
          key: `box-${i}`,
          labelIndex,
          score,
          isTarget
        });
      }
    });
    let spotType = "miss";
    if (!!boxesToRender.length > 0) {
      spotType = "incorrect";
      const hitTarget = boxesToRender.find(({ isTarget }) => isTarget);
      if (!!hitTarget) {
        spotType = "correct";
        setIsConfirming(true);
        setTimeout(() => {
          setIsConfirming(false);
        }, 3000);
        if (!isEvolving) {
          setTimeout(() => {
            onHitTarget(hitTarget.labelIndex);
          }, 1500);
        }
        setIsEvolving(true);
        setTimeout(() => {
          setIsEvolving(false);
        }, 3000);
      }
      setTargetBoxes(boxesToRender);
      setTimeout(() => {
        setTargetBoxes([]);
      }, 100);
    }

    const spotProps = {
      left: clientX,
      top: clientY,
      type: spotType
    };

    setSpot(spotProps);
    setTimeout(() => {
      setSpot(null);
    }, 500);
  };

  const onPlayerStateChange = e => {
    console.log("onPlayerStateChange", onPlayerStateChange);
    if (componentIsMounted.current) {
      console.log("STILL MOUNTED");
      const state = e.data;
      // TODO: Error state if video not playing properly
      if (state !== -1) {
        setPlayerState(state);
      }
    }
  };
  console.log("playerState", playerState);

  const targetContent = (
    <div className="play__target">
      {targetAnimal && (
        <div className="play__target-image">
          <img
            src={`https://jk-fish-test.s3.us-east-2.amazonaws.com/medoosa-stock/${targetAnimal.name.replace(
              " ",
              "-"
            )}.jpg`}
          />
          {isConfirming && <SpottingConfirmation />}
        </div>
      )}
    </div>
  );

  const finishContent = (
    <div className="play__finish">
      <p className="brand-text">Well Done!</p>
      <Link to="/share">
        <Button>Finish</Button>
      </Link>
    </div>
  );

  const playContent =
    stage >= 5
      ? finishContent
      : targetAnimal && playerState !== -1
      ? targetContent
      : introContent;

  return (
    <div className="play">
      {spot && <Spot {...spot} radius={radius} />}
      <div
        className="play__video"
        style={{
          width: videoWidth,
          height: videoHeight
        }}
        ref={videoRef}
        onClick={handleClick}
      >
        {targetBoxes.length > 0 && targetBoxes.map(box => <Box {...box} />)}
        {videoWidth && (
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
            onStateChange={onPlayerStateChange}
          />
        )}
        {(playerState === 1 || playerState === 3) && (
          <div
            className="overlay"
            style={{ width: videoWidth, height: videoHeight }}
          />
        )}
      </div>
      <div className="play__avatar">
        <Body stage={stage} modSelections={modSelections} />
        {isEvolving && <EvolutionGlow />}
      </div>
      {playContent}
      {targetAnimal && playerState !== -1 && (
        <div className="play__instructions">
          Help me find the{" "}
          <span className="brand-text">{targetAnimal.name}</span>
        </div>
      )}
    </div>
  );
};

export default Play;
