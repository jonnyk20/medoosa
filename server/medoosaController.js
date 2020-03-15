const mongoose = require("mongoose");
const Medoosa = mongoose.model("Medoosa");
const loadfakeMedoosas = require("./migration/loadFakeMedoosas");

exports.list_all_medoosas = function(req, res) {
  Medoosa.find({}, function(err, medoosas) {
    if (err) res.send(err);
    res.json(medoosas.slice(-20));
  });
};

exports.create_medoosa = function(req, res) {
  const new_medoosa = new Medoosa(req.body);
  new_medoosa.save(function(err, medoosa) {
    if (err) res.send(err);
    res.json(medoosa);
  });
};

exports.read_medoosa = function(req, res) {
  Medoosa.find({ index: req.params.index }, function(err, medoosa) {
    if (err) res.send(err);
    res.json(medoosa);
  });
};

exports.update_medoosa = function(req, res) {
  Medoosa.findOneAndUpdate(
    { medoosa: req.params.index },
    req.body,
    { new: true },
    function(err, medoosa) {
      if (err) res.send(err);
      res.json(medoosa);
    }
  );
};

exports.delete_medoosa = function(req, res) {
  Medoosa.remove(
    {
      _id: req.params.medoosaId
    },
    function(err, medoosa) {
      if (err) res.send(err);
      res.json({ message: "Medoosa successfully deleted" });
    }
  );
};

exports.load_fake_medoosas = async (req, res) => {
  await loadfakeMedoosas(20);
  res.json({ message: "Did it" });
};
