var express = require("express");
var router = express.Router();

const loginController = require("../controllers/login");
const todoController = require("../controllers/todo");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("login", {
    error: {
      status: "",
      type: "",
      message: ""
    },
    login: false
  });
});

router.post("/todo", async (req, res, next) => {
  let retorno = await loginController.getLogin({
    nome: req.body.login,
    senha: req.body.password
  });

  console.log(retorno);

  if (retorno.error.status) {
    return res.render("login", retorno);
  }

  let todos = await todoController.returnAllItems(retorno.result[0].Id);

  console.log(todos);
  return res.render("todo", { ...retorno, todos });
});

router.get("/todo/:id", (req, res, next) => {
  res.redirect("/");
});

router.post("/todo-add", async (req, res, next) => {
  console.log(req.body);

  await todoController.InsertTodo({ tarefa: req.body.tarefa, id: req.body.id });
  const todos = await todoController.returnAllItems(req.body.id);

  res.render("todo", {
    todos,
    result: [{ Id: req.body.id }],
    error: {
      status: "",
      type: "",
      message: ""
    },
    login: true
  });
});

router.post("/todo-delete", async (req, res, next) => {
  console.log(req.body);

  await todoController.DeleteTodo({ id: req.body.item });
  const todos = await todoController.returnAllItems(req.body.id);

  res.render("todo", {
    todos,
    result: [{ Id: req.body.id }],
    error: {
      status: "",
      type: "",
      message: ""
    },
    login: true
  });
});

module.exports = router;
