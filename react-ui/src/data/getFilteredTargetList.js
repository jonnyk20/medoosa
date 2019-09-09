import animalsData from "./animal-data"

const ignoreListDefault = [2, 6, 8 /**/, 7, 5]

export default (ignoreList = []) =>
  animalsData
    .filter(({ id }) => ![...ignoreListDefault, ...ignoreList].includes(id))
    .map(({ id }) => id)
