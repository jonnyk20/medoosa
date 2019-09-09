import React, { useState } from "react"
import { MdDone, MdExpandMore } from "react-icons/md"
import Carousel from "../Carousel/Carousel"
import Button from "../Button/Button"
import Body from "../Body"

import "./Customize.scss"

// npm install react-icons --save

const Customize = ({
  items,
  onConfirm,
  modSelections,
  stage,
  isModalOpen,
  goHome,
}) => {
  const [selectedItem, setSelectedItem] = useState(0)
  const handeClick = () => onConfirm(selectedItem)
  console.log("ITEKs", modSelections)
  return (
    <div className="customize">
      <div className="customize__avatar">
        <Body stage={stage} modSelections={modSelections} />
      </div>
      <div className="customize__selection">
        <div className="icon">
          <MdExpandMore />
        </div>
        <Carousel
          items={items}
          afterChange={setSelectedItem}
          initialSlide={(modSelections[stage] || {}).value}
        />
      </div>
      <div className="customize__confirmation">
        <Button onClick={handeClick}>
          <MdDone />
        </Button>
      </div>
    </div>
  )
}

export default Customize
