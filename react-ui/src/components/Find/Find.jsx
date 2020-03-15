import React, { useState, useRef, useEffect, Fragment } from "react"
import * as tf from "@tensorflow/tfjs"
import { Link } from "gatsby"
import { getOrientation, disablePageDrag } from "../../utils"
import BoundingBoxList from "../BoundingBoxList/BoundingBoxList"
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"
import { CLASSIFICATION_STATES } from "../../constants"

import "./Find.scss"

const FishDemo = ({
  detectionModel,
  classificationModel,
  onAnimalClassified,
  foundAnimals,
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [predicted, setPredicted] = useState(false)
  const [isPredicting, setIsPredicting] = useState(false)
  const [hiddenSrc, setHiddenSrc] = useState(null)
  const [resizedSrc, setResizedSrc] = useState(null)
  const [fail, setFail] = useState(false)
  const [resized, setResized] = useState(false)
  const [orientation, setOrientation] = useState(0)
  const [predictions, setPredictions] = useState([])
  const [divWidth, setDivWith] = useState("auto")
  const [divHeight, setDivHeight] = useState("auto")
  const inputRef = useRef()
  const hiddenRef = useRef()
  const resizedRef = useRef()
  const rotationCanvasRef = useRef()
  const hiddenCanvasRef = useRef()
  const cropRef = useRef()

  const drawBoxes = boxes => {
    const { current: img } = rotationCanvasRef
    const { width: imgW, height: imgH } = img
    const newPredictions = []
    boxes.forEach((topBox, index) => {
      const topLeft = [topBox[1] * imgW, topBox[0] * imgH]
      const bottomRight = [topBox[3] * imgW, topBox[2] * imgH]
      const boxW = bottomRight[0] - topLeft[0]
      const boxH = bottomRight[1] - topLeft[1]
      const boxX = topLeft[0]
      const boxY = topLeft[1]
      const newPrediction = {
        index,
        x: boxX,
        y: boxY,
        w: boxW,
        h: boxH,
        classificationState: CLASSIFICATION_STATES.NOT_CLASSIFIED,
        classification: null,
      }
      newPredictions.push(newPrediction)
    })
    setPredictions(newPredictions)
    // cropForClassification(newPredictions[0])
  }

  const formatData = tensors => {
    const [
      ,
      ,
      // raw_detection_scores
      // raw_detection_boxes
      detection_scores,
      detection_boxes,
      num_detections, // detection_classes,
      ,
    ] = tensors

    const boxes = []
    for (let i = 0; i < num_detections.values[0]; i++) {
      const n = i * 4
      const box = detection_boxes.values.slice(n, n + 4)
      if (detection_scores.values[i] > 0.2) {
        boxes.push(box)
      }
    }
    drawBoxes(boxes)
  }

  const makePrediction = async () => {
    const { current: img } = rotationCanvasRef
    let predictionFailed = false
    setFail(false)
    setIsPredicting(true)
    try {
      const tfImg = tf.browser.fromPixels(img).toFloat()
      const expanded = tfImg.expandDims(0)
      const res = await detectionModel.executeAsync(expanded)
      console.log("RES", res)
      // return
      // const detection_boxes = res[2]
      // const arr = await detection_boxes.array()
      const tensors = await Promise.all(
        res.map(async (ts, i) => {
          return await ts.buffer()
        })
      )
      formatData(tensors)
      tfImg.dispose()
      expanded.dispose()
      console.log("RES", res)
      tf.dispose(res)
      // res.dispose()
    } catch (err) {
      predictionFailed = true
      console.log("EERR", err)
    }
    setPredicted(true)
    setIsPredicting(false)
    setFail(predictionFailed)
  }

  const handleLoad = () => {
    const { current: img } = hiddenRef
    const width = img.width,
      height = img.height

    const { current: canvas } = hiddenCanvasRef
    const ctx = canvas.getContext("2d")

    // set proper canvas dimensions before transform & export
    if (4 < orientation && orientation < 9) {
      canvas.width = height
      canvas.height = width
    } else {
      canvas.width = width
      canvas.height = height
    }

    // transform context before drawing image
    switch (orientation) {
      case 2:
        ctx.transform(-1, 0, 0, 1, width, 0)
        break
      case 3:
        ctx.transform(-1, 0, 0, -1, width, height)
        break
      case 4:
        ctx.transform(1, 0, 0, -1, 0, height)
        break
      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0)
        break
      case 6:
        ctx.transform(0, 1, -1, 0, height, 0)
        break
      case 7:
        ctx.transform(0, -1, -1, 0, height, width)
        break
      case 8:
        ctx.transform(0, -1, 1, 0, 0, width)
        break
      default:
        break
    }
    ctx.drawImage(img, 0, 0)
    setResizedSrc(canvas.toDataURL())
  }

  const processPrecitions = (boxIndex, results) => {
    let predictionList = []
    for (let i = 0; i < results.length; i++) {
      predictionList.push({ value: results[i], index: i })
    }
    predictionList = predictionList.sort((a, b) => {
      return b.value - a.value
    })
    const top = predictionList[0]
    const boxUpdates = { classificationState: CLASSIFICATION_STATES.CLASSIFIED }
    let isClassificationFound = top.value > 0.9
    if (isClassificationFound) {
      console.log(`BOX #${boxIndex} corresponds to CLASS #${top.index}`)
      boxUpdates.classification = top.index
    } else {
      console.log(`BOX #${boxIndex} contains no idenitifiable classes`)
    }
    if (isClassificationFound && !foundAnimals.has(top.index)) {
      console.log("OPTION A")
      onAnimalClassified(top.index)
      return
    } else {
      console.log("OPTION B")
      const boxes = predictions.map(box =>
        box.index === boxIndex ? { ...box, ...boxUpdates } : box
      )
      setPredictions(boxes)
      return
    }
  }

  const runClassification = async boxIndex => {
    const { current: img } = cropRef
    const tfImg = tf.browser.fromPixels(img).toFloat()
    let input = tf.image.resizeBilinear(tfImg, [224, 224])
    const offset = tf.scalar(127.5)

    // Normalize the image
    input = input.sub(offset).div(offset)

    const global = input.expandDims(0)
    console.log(global.shape)
    const results = classificationModel.predict(global)
    tfImg.dispose()
    input.dispose()
    offset.dispose()
    global.dispose()
    const ok = await results.buffer()
    results.dispose()

    processPrecitions(boxIndex, ok.values)
  }

  const startClassification = index => {
    const box = predictions[index]
    const { current: source } = rotationCanvasRef
    const { current: target } = cropRef
    const { width: w, height: h } = source.getBoundingClientRect()
    const A = box.x // x
    const B = box.y // y
    const C = w // w original
    const D = h // h original
    const E = 0
    const F = 0
    const G = w // w original (scale)
    const H = h // h original (scale)
    const ctx = target.getContext("2d")
    target.height = box.h // cropH
    target.width = box.w // cropW

    ctx.drawImage(source, A, B, C, D, E, F, G, H)
    runClassification(index)
  }

  const resize = () => {
    const { innerWidth: maxWidth } = window
    const { current: canvas } = rotationCanvasRef
    const ctx = canvas.getContext("2d")
    const { current: img } = resizedRef
    let { height, width } = img

    if (width > maxWidth) {
      const ratio = width / height
      width = maxWidth
      height = maxWidth / ratio
    }
    canvas.width = width
    canvas.height = height
    setDivWith(width)
    setDivHeight(height)
    ctx.drawImage(img, 0, 0, width, height)
    setResized(true)
    makePrediction()
  }

  const handleChange = event => {
    const { files } = event.target
    if (files.length > 0) {
      const hiddenSrc = URL.createObjectURL(event.target.files[0])
      getOrientation(event.target.files[0], orientation => {
        setOrientation(orientation)
        setHiddenSrc(hiddenSrc)
      })
    }
    setIsUploading(false)
  }

  const reset = e => {
    e.stopPropagation()
    setPredicted(false)
    setResized(false)
    setPredictions([])
    setResizedSrc(null)
    setFail(false)
    triggerInput()
  }

  const cancelUploading = () => {
    if (isUploading) {
      setIsUploading(false)
    }
  }

  const triggerInput = () => {
    setIsUploading(true)
    if (document.body) {
      document.body.onfocus = cancelUploading
    }
    inputRef.current.click()
  }

  const hidden = {
    display: "none",
  }
  const controlModifierClasses =
    predicted && !fail ? "control--successful-detection" : ""
  let body
  useEffect(() => {
    // disablePageDrag()
    return tf.disposeVariables
  })

  const awaitingUpload = !isUploading && !resized
  const localizationSuccessful = predicted && !fail

  return (
    <div
      className="wrapper"
      style={resized ? { width: divWidth, height: divHeight } : {}}
    >
      <img
        id="hidden-upload-placeholder"
        src={hiddenSrc}
        ref={hiddenRef}
        style={hidden}
        onLoad={handleLoad}
        alt="hidden-upload-placeholder"
      />
      <img
        id="resized-placeholder"
        src={resizedSrc}
        ref={resizedRef}
        style={hidden}
        onLoad={resize}
        alt="resized-target"
      />
      <canvas ref={hiddenCanvasRef} id="hidden-canvas" style={hidden} />
      <canvas
        ref={rotationCanvasRef}
        style={resized ? {} : hidden}
        id="adjusted-image"
      />
      {resized && <div className="overlay" />}
      {predictions.length > 0 && (
        <BoundingBoxList
          boxes={predictions}
          startClassification={startClassification}
        />
      )}
      <div className="control-wrapper">
        <div className={`control ${controlModifierClasses}`}>
          {(isUploading || isPredicting) && <LoadingSpinner />}
          {isPredicting && <div className="control__info">Scanning</div>}

          {awaitingUpload && (
            <Fragment>
              <button href="#" onClick={reset} className="button">
                [o]
              </button>
              <Link to="/home">
                <button href="#" onClick={() => {}} className="button">
                  {"<-"}
                </button>
              </Link>
            </Fragment>
          )}

          {fail && (
            <Fragment>
              <div className="control__info">
                Failed to Find Animals <br />
              </div>
              <button onClick={reset} className="button">
                Retry
              </button>
              <Link to="/home">
                <button href="#" onClick={() => {}} className="button">
                  {"<-"}
                </button>
              </Link>
            </Fragment>
          )}

          {localizationSuccessful && (
            <Fragment>
              <button href="#" onClick={reset} className="button">
                Retry
              </button>
              <Link to="/home">
                <button href="#" onClick={() => {}} className="button">
                  {"<-"}
                </button>
              </Link>
            </Fragment>
          )}

          <input
            type="file"
            accept="image/*"
            capture="camera"
            onChange={handleChange}
            ref={inputRef}
            id="file-input"
            className="control__input"
          />
        </div>
      </div>
      <canvas className="cropped" ref={cropRef} style={hidden} />
    </div>
  )
}

export default FishDemo
