var express = require("express");
var router = express.Router();

const todoController = require("../controllers/todo");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.json({ result: "Api is ready!" });
});

router.get("/todo/:id", async (req, res, next) => {
  const all = await todoController.returnAllItems(req.params.id);
  res.json(all);
});

router.post("/todo", async (req, res, next) => {
  await todoController.InsertTodo({
    tarefa: req.body.tarefa,
    id: req.body.user_id
  });
  res.status(204).json();
});

router.delete("/todo/:id", async (req, res, next) => {
  await todoController.DeleteTodo({ id: req.params.id });
  res.status(204).json();
});

module.exports = router;
