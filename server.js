require("dotenv").config();
const express = require("express");
const server = express();
const path = require("path");
const helmet = require("helmet");
const session = require("express-session");

server.use(express.static(path.join(__dirname, "public")));
server.set("view engine", "ejs");

server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(helmet({contentSecurityPolicy: false}));
server.use(session({
    name: "JASDOIS9SDFA9FA",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: true,
        magAge: 7 * 24 * 60 * 60 * 100
    }
}));

const routes = require("./routes");
server.use("/", routes)

const PORT = process.env.PORT;
server.listen(PORT, ()=> console.log(`Server listening on ${PORT}`));