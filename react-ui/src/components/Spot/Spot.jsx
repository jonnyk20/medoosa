import React from "react"
import "./Spot.scss"

const Spot = ({ top, left, type, radius }) => {
  const className = `spot spot--${type}`

  return (
    <div
      className={className}
      style={{ top: top - radius, left: left - radius }}
    ></div>
  )
}

export default Spot
