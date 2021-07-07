'use strict';
const express = require('express');
const router = express.Router();
const foodModel = require('../models/food');
const Interface = require('../models/interface');
const food = new Interface(foodModel);

router.get('/', getFood);
router.get('/:id', getFood);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

async function getFood(req, res, next) {
  try {
    const id = req.params.id;
    const gettingFood = await food.read(id);
    res.json({ gettingFood });
  } catch (e) {
    next(e);
  }
}

async function createFood(req, res, next) {
  try {
    const data = req.body;
    const newFood = await food.create(data);
    res.json(newFood);
  } catch (e) {
    next(e);
  }
}


async function updateFood(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newFood = await food.update(id, data);
    res.json(newFood);
  } catch (e) {
    next(e);
  }
}




async function deleteFood(req, res, next) {
  try {
    const id = req.params.id;
    const deletedFood = await food.delete(id);
    res.json(deletedFood);
  } catch (e) {
    next(e);
  }
}
module.exports = router;