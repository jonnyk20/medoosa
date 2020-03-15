import React, { useEffect } from "react"
import FindComponent from "../../components/Find/Find"
import { useSelector, useDispatch } from "react-redux"
import { addFoundAnimalAction } from "../../redux/actions"
import { navigate } from "gatsby"

const FindContainer = () => {
  const { models, foundAnimals } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (models.detectionModel === null || models.classifiactionModel === null) {
      navigate("/")
    }
  })

  const onAnimalClassified = i => {
    dispatch(addFoundAnimalAction(i))
    navigate("/question", { state: { index: i } })
  }
  const props = {
    ...models,
    onAnimalClassified,
    foundAnimals,
  }

  return <FindComponent {...props} foundAnimals={foundAnimals} />
}

export default FindContainer
