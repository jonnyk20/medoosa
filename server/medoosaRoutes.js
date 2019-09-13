module.exports = function(app) {
  const medoosas = require("./medoosaController");

  app
    .route("/medoosas")
    .get(medoosas.list_all_medoosas)
    .post(medoosas.create_medoosa)
    .put(medoosas.load_fake_medoosas)

  app
    .route("/medoosas/:medoosaId")
    .get(medoosas.read_medoosa)
    .put(medoosas.update_medoosa)
    .delete(medoosas.delete_medoosa);
};
