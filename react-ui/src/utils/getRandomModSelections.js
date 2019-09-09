import mods from "../components/Mods"

const defaultModSelections = [
  {
    name: "color",
    value: 0,
  },
  {
    name: "eyes",
    value: 0,
  },
  {
    name: "mouth",
    value: 0,
  },
  {
    name: "arms",
    value: 0,
  },
  {
    name: "head",
    value: 0,
  },
]

const getRandomIndex = arr => Math.floor(Math.random() * arr.length)

const getRandomModSelections = num => {
  const modSelectionsArray = []

  for (let i = 0; i < num; i++) {
    const values = mods.map(getRandomIndex)
    const modSelections = defaultModSelections.map((selection, modIndex) => ({
      ...selection,
      value: values[modIndex],
    }))
    modSelectionsArray.push(modSelections)
  }

  return modSelectionsArray
}

export default getRandomModSelections
