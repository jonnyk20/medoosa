import React from "react"
import Button from "../Button/Button"
import { navigate } from "gatsby"
import Body from "../Body"
import "./Start.scss"

const Start = ({ stage, modSelections }) => {
  const startPlaying = () => navigate("/play")

  return (
    <div className="start">
      <div className="start__avatar">
        <Body stage={stage} modSelections={modSelections} />
      </div>
      <div className="start__instructions">
        Help me find my friends. Tap or click the fish in the video to spot
        them.
      </div>
      <Button onClick={startPlaying}>Start</Button>
    </div>
  )
}

export default Start
