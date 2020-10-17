const { io } = require("../index");

io.on("connection", (client) => {
  client.on("disconnect", () => {
    console.log("Disconnected");
  });

  client.on("message", (data) => {
    console.log(data);
    io.emit("message", { admin: "New message" });
  });
});
