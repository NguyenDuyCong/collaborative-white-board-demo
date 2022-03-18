var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("one user online");

  socket.on("disconnect", () => {
    console.log("one user disconnect");
  });

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
});

var PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log(`Started on : ${PORT}`);
});
