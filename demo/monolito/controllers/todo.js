"use strict";

const dbOpen = require("../config/database/db.js");

module.exports.returnAllItems = async id => {
  try {
    const db = await dbOpen();

    const query = `SELECT * FROM todolist WHERE id_usuario = '${id}'`;

    console.log(query);

    let result = await db.all(query);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports.InsertTodo = async insert => {
  try {
    const db = await dbOpen();

    const query = `INSERT INTO todolist (tarefa, ativo, id_usuario) VALUES ('${insert.tarefa}', 1, ${insert.id}) `;

    console.log(query);

    let result = await db.run(query);
    return result;
  } catch (err) {
    console.log(err);
  }
};

module.exports.DeleteTodo = async del => {
  try {
    const db = await dbOpen();

    const query = ` DELETE FROM todolist WHERE id = ${del.id} `;

    console.log(query);

    let result = await db.run(query);
    return result;
  } catch (err) {
    console.log(err);
  }
};
