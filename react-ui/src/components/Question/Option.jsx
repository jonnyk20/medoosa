import React from "react"

const Option = ({ option, index, answerQuestion, isCorrect, showAnswer }) => {
  const handleClick = () => answerQuestion(index)
  const showAsCorrect = showAnswer && isCorrect
  const showAsIncorrect = showAnswer && !isCorrect
  return (
    <div onClick={handleClick}>
      {option} {showAsCorrect && "<<"} {showAsIncorrect && "X"}
    </div>
  )
}

export default Option
