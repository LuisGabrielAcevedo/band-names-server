const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();
bands.addBand(new Band("Metallica"));
bands.addBand(new Band("Rata blanca"));
bands.addBand(new Band("Megadeth"));

io.on("connection", (client) => {
  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    // console.log("Disconnected");
  });

  client.on("message", (data) => {
    console.log(data);
    io.emit("message", { admin: "New message" });
  });

  client.on("emit-message", (payload) => {
    // io.emit("new-message", payload); // Send everyone clients
    client.broadcast.emit("new-message", payload); // Send everyone except me
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("add-band", (payload) => {
    bands.addBand(new Band(payload.name));
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });
});
