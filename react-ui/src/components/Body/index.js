import React from "react"
import { colors } from "../Mods/colors"
import Egg from "./Egg/Egg"
import Planula from "./Planula/Planula"
import Polyp from "./Polyp/Polyp"
import Ephyra from "./Ephyra/Ephyra"
import Medusa from "./Medusa/Medusa"
import FinalForm from "./FinalForm/FinalForm"
import "./Body.scss"

const bodies = [Egg, Planula, Polyp, Ephyra, Medusa, FinalForm]

const BodyComponent = ({ stage = 0, modSelections }) => {
  const Body = bodies[stage]
  const color = colors[modSelections[0].value]

  return (
    <div className="body" style={{ color }}>
      <Body modSelections={modSelections} />
    </div>
  )
}

export default BodyComponent
