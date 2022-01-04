const express = require("express");
// on importe cookieparser ici pour que app puisse lire les cookies
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes");

const app = express();
app.use(express.json());
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.status(200).json({ foo: "hello" });
// });

app.use("/api", mainRouter);

module.exports = app;
