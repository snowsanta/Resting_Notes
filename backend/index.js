const http = require("http");
const app = require("./app.js");

// create the listener
const server = http.createServer(app);
server.listen(3000);
