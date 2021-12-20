const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Express app
const app = express();

// constants
const PORT = 8080;

// application level middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(morgan("dev"));

// route initialize
app.use("/api", require("./routes/itemsIntake"));

// global error handler
app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ error: { status: err.status || 500, message: err.message } });
});

// server startup logic
const server = app.listen(PORT, () => {
  console.log(`Server started | Link: http://localhost:${PORT}/`);
});

module.exports = server;
