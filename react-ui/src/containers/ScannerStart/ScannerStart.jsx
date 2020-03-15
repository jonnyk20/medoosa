import React, { useState } from "react"
import ScannerStartComponent from "../../components/ScannerStart/ScannerStart"
import { useDispatch } from "react-redux"
import { navigate } from "gatsby"
import * as tf from "@tensorflow/tfjs"
import {
  setDetectionModelAction,
  setClassificationModelAction,
} from "../../redux/actions"

const DETECTION_MODEL_URL =
  "https://jk-fish-test.s3.us-east-2.amazonaws.com/animal_mobilenet/model.json"

const CLASSIFICATION_MODEL_URL =
  "https://jk-fish-test.s3.us-east-2.amazonaws.com/test_fish_classifier/model.json"

const ScannerStartContainer = () => {
  const dispatch = useDispatch()
  const [
    classificationDownloadProgress,
    setClassifiationDownloadProgress,
  ] = useState(0)
  const [detectionDownloadProgress, setDetectionDownloadProgress] = useState(0)

  const totalDownloadProgress =
    0.6 * detectionDownloadProgress + 0.4 * classificationDownloadProgress

  const setDetectionModel = model => dispatch(setDetectionModelAction(model))

  const setClassificationModel = model =>
    dispatch(setClassificationModelAction(model))

  const loadDetectionModel = async () => {
    let model
    try {
      model = await tf.loadGraphModel(DETECTION_MODEL_URL, {
        onProgress: progress => {
          setDetectionDownloadProgress(progress)
        },
      })
      // try {
      //   const warmupResult = await model.executeAsync(
      //     tf.zeros([1, 300, 300, 3])
      //   )
      //   console.log("RESUKT", warmupResult)
      // } catch (err) {
      //   console.log("ERROR ON TEST RUN", err)
      // }
    } catch (err) {
      console.log("ERROR ON LOAD", err)
    }
    return model
  }

  const loadClassificationModel = async () => {
    const model = await tf.loadGraphModel(CLASSIFICATION_MODEL_URL, {
      onProgress: progress => {
        setClassifiationDownloadProgress(progress)
      },
    })
    return model
  }

  const loadModels = async () => {
    const detectionModel = await loadDetectionModel()
    setDetectionModel(detectionModel)

    const classificationModel = await loadClassificationModel()
    setClassificationModel(classificationModel)

    navigate("/home")
  }

  return (
    <ScannerStartComponent
      loadModels={loadModels}
      downloadProgress={totalDownloadProgress}
    />
  )
}

export default ScannerStartContainer
