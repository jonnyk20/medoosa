import React, { useState, useEffect } from "react"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { CLASSIFICATION_STATES } from "../../constants"

import "./BoundingBox.scss"

const BoundingBox = ({ box, startClassification }) => {
  const { x, y, w, h, index, classificationState } = box
  const style = {
    position: "absolute",
    left: x,
    top: y,
    height: h,
    width: w,
  }
  const [isClassifying, setIsClassifying] = useState(false)
  const [classificationPending, setClassificationPending] = useState(true)

  useEffect(() => {
    if (
      classificationState === CLASSIFICATION_STATES.NOT_CLASSIFIED &&
      isClassifying &&
      classificationPending
    ) {
      console.log("GOING ONCE")
      setClassificationPending(false)
      startClassification(index)
    }
  })

  const handleClick = () => {
    if (classificationState === CLASSIFICATION_STATES.NOT_CLASSIFIED) {
      setIsClassifying(true)
    }
  }

  if (
    isClassifying &&
    classificationState === CLASSIFICATION_STATES.CLASSIFIED
  ) {
    setIsClassifying(false)
  }

  if (index === 3) {
    console.log("Is classifying", isClassifying)
  }

  return (
    <div className="bounding-box" style={style} onClick={handleClick}>
      {isClassifying && <LoadingSpinner />}
    </div>
  )
}

export default BoundingBox
