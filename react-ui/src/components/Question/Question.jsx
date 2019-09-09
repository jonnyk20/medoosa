import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import Option from "./Option"
import Modal from "react-modal"

Modal.setAppElement("#___gatsby")

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const Question = ({ animal, addPoints }) => {
  const { question, options, answer } = animal
  const [answeredIncorrectly, setAnsweredIncorrectly] = useState(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (answeredCorrectly && !isModalOpen) {
      setIsModalOpen(true)
    }
  })

  const moveToCustomization = () => navigate("/customize")

  const answerQuestion = index => {
    if (index === answer) {
      console.log("Correct")
      if (answeredIncorrectly) {
        addPoints(50)
      } else {
        console.log("+100")
        addPoints(100)
      }
      setAnsweredCorrectly(true)
    } else {
      console.log("WRONG")
      setAnsweredIncorrectly(true)
    }
  }

  return (
    <div>
      Question Component for {animal.name}
      <div>{question}</div>
      <div>
        {options.map((option, i) => (
          <Option
            option={option}
            key={option}
            index={i}
            answerQuestion={answerQuestion}
            isCorrect={i === answer}
            showAnswer={answeredIncorrectly}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={() => {}}
        onRequestClose={moveToCustomization}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  )
}

export default Question
