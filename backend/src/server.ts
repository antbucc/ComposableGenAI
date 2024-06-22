// src/server.ts
import errorHandler from "errorhandler";
import app from "./app";
import mongoose from 'mongoose';
import { MONGO_URL, PORT } from "./utils/secrets";

/**
 * Start Express server.
 */
const server = app.listen(PORT, async () => {
    await mongoose.connect(MONGO_URL);
    console.log("  Database Connected!");
    console.log(
        "  App is running at http://localhost:%d in %s mode  🚀🚀",
        PORT
    );
    console.log("  Press CTRL-C to stop\n");
});

export default server;
