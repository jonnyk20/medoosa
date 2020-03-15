import React from "react"
import BoundingBox from "../BoundingBox/BoundingBox"

const BoundingBoxList = ({ boxes, startClassification }) =>
  boxes.map(box => (
    <BoundingBox
      box={box}
      startClassification={startClassification}
      key={box.index}
    />
  ))

export default BoundingBoxList
