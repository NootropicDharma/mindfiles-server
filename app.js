// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

const palaceRoutes = require('./routes/palace.routes');
app.use("/api", palaceRoutes);

const roomRoutes = require('./routes/room.routes');
app.use("/api", roomRoutes);

const userRoutes = require('./routes/user.routes');
app.use("/api", userRoutes)

const memoryRoutes = require('./routes/memory.routes');
app.use("/api", memoryRoutes)

const notesRoutes = require('./routes/booknotes.routes');
app.use("/api", notesRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
