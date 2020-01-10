"use strict";
const sqlite = require("sqlite");

module.exports = async () => await sqlite.open("./monolito.sqlite");
("");
