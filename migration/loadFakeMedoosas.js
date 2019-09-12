require("dotenv").config();
const mongoose = require("mongoose");
require("../server/medoosaModel");
const Medoosa = mongoose.model("Medoosa");

const fakeNames = require("./fakeNames");
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

const modCounts = {
  color: 7,
  eyes: 13,
  mouth: 8,
  arms: 4,
  head: 4
};

const getRandomIndex = length => Math.floor(Math.random() * length);

const getRandomMeooda = i => {
  const medoosa = {};
  Object.entries(modCounts).forEach(([key, val]) => {
    medoosa[key] = getRandomIndex(val);
  });
  medoosa.name = fakeNames[i];

  return medoosa;
};

const getRandomMedoosas = num => {
  const medoodas = [];
  for (let i = 0; i < num; i++) {
    medoodas.push(getRandomMeooda(i));
  }
  return medoodas;
};

const saveMedoosa = async data => {
  const medoosa = new Medoosa(data);
  await medoosa.save();
  console.log("saved one");
};

const saveMedoosas = async num => {
  const dataArray = getRandomMedoosas(num);
  await Promise.all(dataArray.map(saveMedoosa));
  console.log("SAVED ALL");
};

saveMedoosas(20);
