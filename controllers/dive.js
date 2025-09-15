const express = require("express");
const router = express.Router();
// import Dive model
const Dive = require("../models/dive");

router.get("/", async (req, res) => {
  const divesData = await Dive.find({ diver: req.session.user._id });
  //   if (!dive.time) return acc;

  //   const parts = dive.time.split(":"); // Splits the string into ["00", "25"]
  //   const hours = parseInt(parts[0], 10); // Converts "00" to 0
  //   const minutes = parseInt(parts[1], 10); // Converts "25" to 25

  //   const totalMinutes = hours * 60 + minutes;

  //   console.log("total Min: ", totalMinutes);
  //   console.log("acc: ", acc);

  //   return acc + totalMinutes;
  // }, 0);

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

router.get("/:diveId", async (req, res) => {
  const dive = await Dive.findById(req.params.diveId);
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
    console.error(error);
  }
});

router.put("/:diveId", async (req, res) => {
  await Dive.findByIdAndUpdate(req.params.diveId, req.body);
  res.redirect(`/dives/${req.params.diveId}`);
});

module.exports = router;
