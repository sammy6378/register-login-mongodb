"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("dotenv/config");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var port = process.env.PORT;
app.listen(port, function () {
    console.log("Server running on port: ", port);
});
