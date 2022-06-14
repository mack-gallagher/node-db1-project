const express = require("express");

const server = express();
server.use(express.json());

const router = require('./accounts/accounts-router');
server.use('/api/accounts', router);

module.exports = server;
