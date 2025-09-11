const express = require("express");
const router = express.Router();
// import Dive model
const Dive = require("../models/dive");
const { findByIdAndDelete } = require("../models/user");

router.get("/", async (req, res) => {
  const divesData = await Dive.find({ diver: req.session.user._id });
  res.render("dives/index.ejs", { dives: divesData });
});

router.get("/new", (req, res) => {
  res.render("dives/new.ejs");
});

router.get("/all", async (req, res) => {
    const dives = await Dive.find().populate("diver");
    res.render("dives/all.ejs", {dives});
});

router.post("/", async (req, res) => {
  console.log(req.body);
  req.body.diver = req.session.user._id;
  await Dive.create(req.body);
  res.redirect("/dives");
});

router.get("/:diveId", async (req, res) => {
  const dive = await Dive.findById(req.params.diveId);
  // console.log(dive)
  res.render("dives/show.ejs", { dive });
});

router.delete("/:diveId", async (req, res) => {
  try {
    await Dive.findByIdAndDelete(req.params.diveId);
    res.redirect("/dives");
  } catch (error) {
    console.error(error);
  }
});

router.get("/:diveId/edit", async (req, res) => {
  try {
    const dive = await Dive.findById(req.params.diveId);
    res.render("dives/edit.ejs", { dive });
  } catch (error) {
    console.error(error)
  }
});

router.put("/:diveId", async (req, res) => {
    await Dive.findByIdAndUpdate(req.params.diveId, req.body);
    res.redirect(`/dives/${req.params.diveId}`);
});


module.exports = router;
