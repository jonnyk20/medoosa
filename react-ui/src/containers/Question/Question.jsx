import React from "react"
import Question from "../../components/Question/Question"
import animals from "../../data/animal-data"
import { useDispatch } from "react-redux"
import { addPointsAction } from "../../redux/actions"

const QuestionContainer = props => {
  const dispatch = useDispatch()
  // console.log("INDEX", props.location.state.index)
  // TODO (JK) Redirect to home if there is no state
  const index = 0
  console.log("PROPS", props)
  console.log("Animal Data", animals)
  const animal = animals[index]

  const addPoints = points => dispatch(addPointsAction(points))

  return <Question animal={animal} addPoints={addPoints} />
}

export default QuestionContainer
