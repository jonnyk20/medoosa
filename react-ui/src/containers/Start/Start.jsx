import React, { useEffect } from "react"
import StartComponent from "../../components/Start/Start"
import { useSelector, useDispatch } from "react-redux"
import {
  setModsAction,
  setTargetAction,
  setInitalizedAction,
} from "../../redux/actions"
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner"
import getFilteredTargetList from "../../data/getFilteredTargetList"
import { getRandomItem } from "../../utils"
import mods from "../../components/Mods"

const getRandomIndex = arr => Math.floor(Math.random() * arr.length)
const initialValues = mods.map(getRandomIndex)

const Start = () => {
  const { stage, modSelections, initialized } = useSelector(state => ({
    stage: state.medoosa.stage,
    modSelections: state.medoosa.modSelections,
    initialized: state.initialized,
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    const initialTarget = getRandomItem(getFilteredTargetList())
    const initialModsSelections = modSelections.map((selection, i) => ({
      ...selection,
      value: initialValues[i],
    }))
    dispatch(setTargetAction(initialTarget))
    dispatch(setModsAction(initialModsSelections))
    dispatch(setInitalizedAction())
  }, [])

  return initialized ? (
    <StartComponent stage={stage} modSelections={modSelections} />
  ) : (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <LoadingSpinner />
    </div>
  )
}

export default Start
