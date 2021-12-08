const usersRouter = require("express").Router();
const { User } = require("../models");

usersRouter.get("/", async (req, res) => {
  try {
    const [results] = await User.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [[results]] = await User.findOneById(id);
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

usersRouter.post("/", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const [[userWithEmail]] = await User.findOneByEmail(email);
    if (!userWithEmail) {
      const [result] = await User.createOne({ firstname, lastname, email, password });
      const [[userCreated]] = await User.findOneById(result.insertId);
      res.status(201).json(userCreated);
    } else {
      res.status(400).send("Email already used");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = usersRouter;
