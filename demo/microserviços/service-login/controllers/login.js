"use strict";

const dbOpen = require("../config/database/db.js");

module.exports.getLogin = async usuario => {
  try {
    const db = await dbOpen();

    const query = `SELECT id FROM usuarios WHERE usuario = '${usuario.nome}' AND senha = '${usuario.senha}'`;

    console.log(query);

    let result = await db.all(query);
    console.log(result);

    if (!result.length)
      return {
        login: false,
        result: "",
        error: {
          status: "400",
          type: "warning",
          message: "Usuário ou senha Incorretos!"
        }
      };

    return {
      login: true,
      result: result,
      error: {
        status: "",
        type: "",
        message: ""
      }
    };
  } catch (err) {
    console.log(err);

    return {
      login: false,
      result: "",
      error: {
        status: "500",
        type: "danger",
        message: "Ops! Ouve um erro no sistema!"
      }
    };
  }
};
