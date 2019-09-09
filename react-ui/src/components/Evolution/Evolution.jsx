import React, { useState, useEffect } from "react"
import Modal from "react-modal"
import Body from "../Body"

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}

const Evolution = ({ onClose, onEvolve, stage, modSelections }) => {
  const [isEvolutionDone, setIsEvolutionDone] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      onEvolve()
      setIsEvolutionDone(true)
      console.log("DONE!")
    }, 3000)
  }, [])

  const onRequestClose = () => {
    if (isEvolutionDone) {
      onClose()
    }
  }

  return (
    <Modal
      isOpen
      onAfterOpen={() => {}}
      onRequestClose={onRequestClose}
      style={modalStyles}
      contentLabel="Example Modal"
    >
      <div>I am a modal</div>
      <form>
        <Body stage={stage} modSelections={modSelections} />
      </form>
    </Modal>
  )
}

export default Evolution
