import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { navigate } from "gatsby"
import HomeComponent from "../../components/Home/Home"

const HomeContainer = () => {
  const { detectionModelLoaded, stage, modSelections } = useSelector(state => ({
    detectionModelLoaded: !!state.models.detectionModel,
    stage: state.medoosa.stage,
    modSelections: state.medoosa.modSelections,
  }))
  useEffect(() => {
    if (!detectionModelLoaded) {
      navigate("/")
    }
  })

  return <HomeComponent stage={stage} modSelections={modSelections} />
}

export default HomeContainer
