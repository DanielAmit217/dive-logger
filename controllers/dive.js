const express = require("express");
const router = express.Router();
const Dive = require("../models/dive");

router.get("/", async (req, res) => {
  const divesData = await Dive.find({ diver: req.session.user._id });

  res.render("dives/index.ejs", { dives: divesData });
});

router.get("/new", (req, res) => {
  res.render("dives/new.ejs");
});

router.get("/all", async (req, res) => {
  const dives = await Dive.find().populate("diver");
  res.render("dives/all.ejs", { dives });
});

router.get("/users/:userId", async (req, res) => {
  const userDives = await Dive.find({ diver: req.params.userId }).populate({
    path: "diver",
    select: "-password",
  });
  const userData = userDives[0].diver;
  if (userData.username === req.session.user.username) {
    res.redirect("/dives");
  } else {
    res.render("users/index.ejs", { currentUser: userData, userDives });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  req.body.diver = req.session.user._id;
  await Dive.create(req.body);
  res.redirect("/dives");
});

router.get("/:diveId/edit", async (req, res) => {
  try {
    const dive = await Dive.findById(req.params.diveId).populate({
      path: "diver",
      select: "-password",
    });
    if (req.session.user._id === dive.diver._id) {
      res.render("dives/edit.ejs", { dive });
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/:diveId", async (req, res) => {
  try {
    const dive = await Dive.findById(req.params.diveId).populate({
      path: "diver",
      select: "-password",
    });

    res.render("dives/show.ejs", { dive });
  } catch (error) {
    console.error(error);
  }
});

router.delete("/:diveId", async (req, res) => {
  try {
    await Dive.findByIdAndDelete(req.params.diveId);
    res.redirect("/dives");
  } catch (error) {
    console.error(error);
  }
});

router.put("/:diveId", async (req, res) => {
  await Dive.findByIdAndUpdate(req.params.diveId, req.body);
  res.redirect(`/dives/${req.params.diveId}`);
});

module.exports = router;
