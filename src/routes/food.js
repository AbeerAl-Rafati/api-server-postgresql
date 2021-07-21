"use strict";
const express = require("express");
const router = express.Router();
// const foodModel = require('../models/food');
const Interface = require("../models/interface");
const foods = new Interface(`food`);

router.get("/", getFood);
router.get("/:id", getFood);
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);

async function getFood(req, res, next) {
  try {
    const id = req.params.id;
    const gettingFood = await foods.read(id);
    res.json(gettingFood.rows);
  } catch (e) {
    next(e);
  }
}

async function createFood(req, res, next) {
  try {
    const data = req.body;
    const newFood = await foods.create(data);
    res.json(newFood.rows[0]);
  } catch (e) {
    next(e);
  }
}

async function updateFood(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newFood = await foods.update(id, data);
    res.json(newFood.rows[0]);
  } catch (e) {
    next(e);
  }
}

async function deleteFood(req, res, next) {
  try {
    const id = req.params.id;
    const deletedFood = await foods.delete(id);
    res.json(deletedFood.rows[0]);
  } catch (e) {
    next(e);
  }
}
module.exports = router;
