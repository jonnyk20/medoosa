import React, { useState, useRef, useEffect, Fragment } from "react";
import YouTube from "react-youtube";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Play.scss";
import Box from "../Box/Box";
import Body from "../Body";
import LevelUp from "../../containers/LevelUp/LevelUp";
import { getVideoDimensions, absorb, makeCanvas } from "../../utils";
import Spot from "../Spot/Spot";
import Button from "../Button/Button";
import StageBar from "../StageBar/StageBar";
import Target from "../Target/Target";
import SpottingConfirmation from "../SpottingConfirmation/SpottingConfirmation";

const videoId = "4a2cSvTph0M";

const particleCanvasStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  zIndex: "1001",
  pointerEvents: "none"
};

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
  <div className="text-box">
    <p className="brand-text">Help me find my friends.</p>
    <p>Start the video and then tap or click the fish to spot them.</p>
  </div>
);

const finishContent = (
  <div className="text-box">
    <p className="brand-text">All Done!</p>
    <Link to="/share">
      <Button>Finish</Button>
    </Link>
  </div>
);

const Play = ({ frames, stage, modSelections, targetAnimal, onHitTarget }) => {
  const [video, setVideo] = useState(null);
  const [videoDimensions, setVideoDimensions] = useState({});
  const [targetBoxes, setTargetBoxes] = useState([]);
  const [spot, setSpot] = useState(null);
  const [playerState, setPlayerState] = useState(-1);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLevelUpPending, setLevelUpPending] = useState(false);
  const [isLevelingUp, setIsLevelingUp] = useState(false);
  const [hitTargetIndex, setHitTargetIndex] = useState(null);
  const [windowDimensions, setWindowDimensions] = useState(null);
  const [animationCanvas, setAnimationCanvas] = useState(null);
  // -1 – unstarted
  // 0 – ended
  // 1 – playing
  // 2 – paused
  // 3 – buffering
  // 5 – video cued
  const videoRef = useRef();
  const componentIsMounted = useRef(true);
  const bodyRef = useRef();
  const targetRef = useRef();
  const particleCanvasRef = useRef();
  const targetCanvasRef = useRef();

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    const dimensions = getVideoDimensions(width);
    setVideoDimensions(dimensions);
    setWindowDimensions({ width, height });
  }, []);

  useEffect(() => {
    if (targetRef.current) {
      const getCanvas = async () => {
        const canvas = await makeCanvas(targetRef.current);
        setAnimationCanvas(canvas);
      };
      getCanvas();
    }
  }, [targetRef.current]);

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
    if (
      isConfirming ||
      isLevelUpPending ||
      !!spot ||
      !targetCanvasRef ||
      !targetRef ||
      !animationCanvas
    ) {
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
        setTimeout(() => {}, 1500);
        setHitTargetIndex(hitTarget.labelIndex);
        thanos();
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
    if (componentIsMounted.current) {
      const state = e.data;
      // TODO: Error state if video not playing properly
      if (state !== -1) {
        setPlayerState(state);
      }
    }
  };

  const onFinish = () => {
    setIsLevelingUp(false);
    setIsConfirming(false);
  };

  const onStartLevelUp = () => {
    setIsLevelingUp(true);
    setLevelUpPending(false);
    onHitTarget(hitTargetIndex);
    setHitTargetIndex(null);
  };

  const targetContent = (
    <Fragment>
      {isConfirming && <SpottingConfirmation />}
      <Target ref={targetRef} />
      {isConfirming ? (
        <div>You got it</div>
      ) : (
        <Fragment>
          <div>Target: {targetAnimal ? targetAnimal.name : "None"}</div>
          <div>Find and tap me in the video above</div>
        </Fragment>
      )}
    </Fragment>
  );

  const levelUpPrompt = (
    <div className="play__evolution-prompt">
      <div>
        Great Job, <br />
        You can now evolve by <br />
        clicking on your Medoosa
      </div>
    </div>
  );

  let mainContent = introContent;

  switch (true) {
    case isLevelUpPending:
      mainContent = levelUpPrompt;
      break;
    case stage >= 5 && !isLevelingUp:
      mainContent = finishContent;
      break;
    case stage >= 5:
      mainContent = null;
      break;
    case isLevelingUp:
      mainContent = null;
      break;
    case targetAnimal && playerState !== -1:
      mainContent = targetContent;
      break;
    default:
      break;
  }

  const thanos = () => {
    const { current: body } = bodyRef;
    const { left, right, top, bottom } = body.getBoundingClientRect();
    const x = left + (right - left) / 2;
    const y = top + (bottom - top) / 2;
    console.log("particleCanvasRef", particleCanvasRef);
    absorb(
      animationCanvas,
      targetRef.current,
      { x, y },
      particleCanvasRef.current,
      targetCanvasRef.current
    );
    setTimeout(() => {
      setLevelUpPending(true);
    }, 3000);
  };

  return (
    <div className="play" style={{ width: videoWidth ? videoWidth : "auto" }}>
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
      <div className="play__hint" onClick={thanos}>
        {stage === 5 || isLevelingUp ? null : isLevelUpPending ? (
          <MdArrowDownward />
        ) : (
          <MdArrowUpward />
        )}
      </div>
      <div
        className={`play__main-content ${
          stage >= 5 ? "play__main-content--finished" : ""
        }`}
      >
        {mainContent}
      </div>
      <div className="play__avatar">
        {!isLevelingUp && (
          <Body
            stage={stage}
            modSelections={modSelections}
            ref={bodyRef}
            isLevelUpPending={isLevelUpPending}
            onClick={isLevelUpPending ? onStartLevelUp : () => {}}
          />
        )}
      </div>

      <div className="play__progress">
        <StageBar
          stage={stage}
          onStartLevelUp={onStartLevelUp}
          isLevelingUp={isLevelingUp}
          levelUpPending={isLevelUpPending}
        />
      </div>
      {isLevelingUp && (
        <LevelUp onFinish={onFinish} particleCanvasRef={particleCanvasRef} />
      )}
      {windowDimensions && (
        <canvas
          style={particleCanvasStyle}
          width={windowDimensions.width}
          height={windowDimensions.height}
          ref={particleCanvasRef}
        />
      )}
    </div>
  );
};

export default Play;
