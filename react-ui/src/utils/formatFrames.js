

const threshold = 0.1

const indexByimage = arr => {
  const output = {}
  arr.forEach(item => {
    const path = item.image.split('/')
    const filename = path[path.length - 1]
    .replace('out', '')
    .replace('.png', '')

    output[filename] = item.data
  });

  return output;
}

const combineBoxesAndScores = (boxes, scores, classifications) => {
  const filteredBoxes = [];
  boxes.forEach((box, i) => {
    const score = scores[i + 1]
    if (score >= threshold) {
      filteredBoxes.push({
        coordinates: box,
        score,
        classification: classifications[i]
      }) 
    }
  });

  return filteredBoxes;
}



const formatFrames = (framesList) => {
  const formattedData = framesList
  .map(frame => ({ ...frame, data: {
    ...frame.data,
    formattedBoxes: combineBoxesAndScores(
    frame.data.detection_boxes,
    frame.data.detection_scores,
    frame.data.classifications
  )
  }}))

  return indexByimage(formattedData)
}

export default formatFrames;