const container = require("./src/startup/container");
const mongoose = require("mongoose");

const server = container.resolve("app");
const { MONGO_URI } = container.resolve("config");

async function connectDataBase() { 
    try {
        mongoose.set("useCreateIndex", true);
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        server.start();
    }
    catch (e) {
        console.log(e.message);
    }
}

connectDataBase();