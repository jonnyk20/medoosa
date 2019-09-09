import React from "react"

export const colors = [
  "#FFFFFF",
  "#78caff",
  "#80ff9e",
  "#f09aff",
  "#ffa0a0",
  "#fff6a5",
  "#ffd863",
]

const addColor = color => () => {
  console.log("COLOR", color)
  return <div className="color" style={{ backgroundColor: color }}></div>
}

const colorComponents = colors.map(addColor)

export default colorComponents
