const container = require("./src/startup/container");
const mongoose = require("mongoose");

const server = container.resolve("app");
const { MONGO_URI } = container.resolve("config");


mongoose.set("useCreateIndex", true);
mongoose.createConnection(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then(() => server.start())
    .catch(console.log);