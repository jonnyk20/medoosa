module.exports = function(app) {
  const medoosas = require("./medoosaController");

  app
    .route("/medoosas")
    .get(medoosas.list_all_medoosas)
    .post(medoosas.create_medoosa);

  app
    .route("/medoosas/:medoosaIndex")
    .get(medoosas.read_medoosa)
    .put(medoosas.update_medoosa)
    .delete(medoosas.delete_medoosa);
};
