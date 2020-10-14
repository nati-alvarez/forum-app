require("dotenv").config();
const express = require("express");
const server = express();

server.use(express.urlencoded({extended: true}));
server.use(express.json());

const routes = require("./routes");
server.use("/", routes)

const PORT = process.env.PORT;
server.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));