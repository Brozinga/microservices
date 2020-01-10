var express = require("express");
var router = express.Router();

const loginController = require("../controllers/login");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.json({ result: "Api is ready" });
});

router.post("/login", async (req, res, next) => {
  let result = await loginController.getLogin({
    nome: req.body.login,
    senha: req.body.senha
  });

  res.json(result);
});

module.exports = router;
