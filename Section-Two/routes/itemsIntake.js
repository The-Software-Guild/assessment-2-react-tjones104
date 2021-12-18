const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const _ = require("underscore");

// stored data array (price = price per unit)
const groceryItems = [
  {
    name: "C7X",
    series: "CX",
    digital: false,
    colors: ["black", "grey", "brown"],
    price: 82999.0,
    _id: "123",
  },
  {
    name: "YDP-184",
    series: "Arius",
    digital: true,
    colors: ["brown"],
    price: 2399.99,
    _id: "1234",
  },
];

// GET w/ Query
router.get("/itemsIntake", (req, res) => {
  //console.log(req.query);

  let query = req.query;
  let deleteKeys = _.difference(
    Object.keys(req.query),
    Object.keys(groceryItems[0])
  );
  deleteKeys.forEach((key) => delete query[key]);

  if (Object.keys(query).length != 0) {
    if (query.digital != undefined) {
      query.digital =
        query.digital === "true" ||
        (query.digital === "false" ? false : query.digital);
    }
    const filteredItems = groceryItems.filter((item) => {
      let isValid = true;
      for (key in query) {
        isValid = isValid && item[key] == query[key];
      }
      return isValid;
    });
    res.status(200).send(filteredItems);
  } else if (deleteKeys.length == 0) {
    res.status(200).send(groceryItems);
  } else {
    res.status(404).send("This query could not found");
  }
});

// GET ONE
router.get("/itemsIntake/:id", (req, res) => {
  if (
    groceryItems.findIndex((groceryItems) => {
      return groceryItems._id == req.params.id;
    }) != -1
  ) {
    let index = groceryItems.findIndex((groceryItems) => {
      return groceryItems._id == req.params.id;
    });
    res.status(200).send(groceryItems[index]);
  } else {
    res.status(404).send("The id was not found");
  }
});

// POST
router.post("/itemsIntake", (req, res) => {
  if (Object.keys(req.body).length == 5) {
    let { name, series, digital, colors, price } = req.body;
    groceryItems.push({
      name: name,
      series: series,
      digital: digital,
      colors: colors,
      price: price,
      _id: uuidv4(),
    });
    res.status(200).send(groceryItems);
  } else {
    res.status(404).send("Incorrect number of properties");
  }
});

// UPDATE
router.put("/itemsIntake/:id", (req, res) => {
  if (
    groceryItems.findIndex((groceryItems) => {
      return groceryItems._id == req.params.id;
    }) != -1
  ) {
    let { name, series, digital, colors, price } = req.body;
    let index = groceryItems.findIndex((groceryItems) => {
      return groceryItems._id == req.params.id;
    });
    Object.assign(groceryItems[index], {
      name: name,
      series: series,
      digital: digital,
      colors: colors,
      price: price,
    });
    res.status(200).send(groceryItems[index]);
  } else {
    res.status(404).send("The id was not found");
  }
});

// DELETE
router.delete("/itemsIntake/:id", (req, res) => {
  if (
    groceryItems.findIndex((groceryItems) => {
      return groceryItems._id == req.params.id;
    }) != -1
  ) {
    let index = groceryItems.findIndex((groceryItems) => {
      return groceryItems._id == req.params.id;
    });
    groceryItems.splice(index, 1);
    res.status(200).send(groceryItems);
  } else {
    res.status(404).send("The id was not found");
  }
});

module.exports = router;
