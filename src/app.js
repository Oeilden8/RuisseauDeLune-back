const express = require("express");
const cors = require("cors");
// on importe cookieparser ici pour que app puisse lire les cookies
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes");

const app = express();
app.use(express.json());
app.use(cookieParser());
// on configure cors pour autoriser uniquement le front a communiquer avec notre API
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_ORIGIN,
  }),
);

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.status(200).json({ foo: "hello" });
});

app.use("/api", mainRouter);

module.exports = app;
