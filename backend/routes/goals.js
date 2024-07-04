const express = require("express");
const router = express.Router();
const Goals = require("../models/goalsModel");
const { User, _ } = require("../models/userModel");

router.get("/", async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  if (!user) {
    return res.status(400).json({ msg: "Invalid request" });
  }
  try {
    const goals = await Goals.find({ user: user._id });
    return res.status(200).json(goals);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.post("/", async (req, res) => {
  const user = await User.findOne({ _id: req.id });
  if (!user) {
    return res.status(400).json({ msg: "Invalid request" });
  }
  const { title, definition } = req.body;
  try {
    const goal = await Goals.create({
      title: title,
      definition: definition,
      user: user,
    });
    return res.status(200).json(goal);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Goals.deleteOne({ _id: id });
    return res.status(200).json({ msg: "deleted" });
  } catch (e) {
    return res.status(400).json({ msg: "fail to delete" });
  }
});

router.post("/:id", (req, res) => {
  return res.send({ msg: "update a goal with a certain id" });
});
module.exports = router;
