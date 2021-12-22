const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const _ = require("underscore");

// stored data array
const instrumentItems = [
  {
    name: "C7X",
    series: "CX",
    digital: false,
    colors: ["black", "grey", "brown"],
    price: 82999.99,
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
  let query = req.query;
  if (Object.keys(query).length != 0 && instrumentItems.length != 0) {
    if (query.digital != undefined) {
      query.digital =
        query.digital === "true" ||
        (query.digital === "false" ? false : query.digital);
    }
    const filteredItems = instrumentItems.filter((item) => {
      let isValid = true;
      for (key in query) {
        if (typeof query[key] === "object") {
          isValid = isValid && item[key].includes(query[key][0]);
        } else {
          isValid = isValid && item[key] === query[key];
        }
      }
      return isValid;
    });
    res.status(200).send(filteredItems);
  } else {
    res.status(200).send(instrumentItems);
  }
});

// GET ONE
router.get("/itemsIntake/:id", (req, res, next) => {
  if (
    instrumentItems.findIndex((instrumentItems) => {
      return instrumentItems._id == req.params.id;
    }) != -1
  ) {
    let index = instrumentItems.findIndex((instrumentItems) => {
      return instrumentItems._id == req.params.id;
    });
    res.status(200).send(instrumentItems[index]);
  } else {
    next(new Error("The id was not found"));
  }
});

// POST
router.post("/itemsIntake", (req, res, next) => {
  if (Object.keys(req.body).length == 5) {
    let { name, series, digital, colors, price } = req.body;
    instrumentItems.push({
      name: name,
      series: series,
      digital: digital,
      colors: colors,
      price: price,
      _id: uuidv4(),
    });
    res.status(201).send(instrumentItems);
  } else {
    next(new Error("Incorrect number of properties"));
  }
});

// UPDATE
router.put("/itemsIntake/:id", (req, res, next) => {
  if (
    instrumentItems.findIndex((instrumentItems) => {
      return instrumentItems._id == req.params.id;
    }) != -1
  ) {
    let { name, series, digital, colors, price } = req.body;
    let index = instrumentItems.findIndex((instrumentItems) => {
      return instrumentItems._id == req.params.id;
    });
    Object.assign(instrumentItems[index], {
      name: name,
      series: series,
      digital: digital,
      colors: colors,
      price: price,
    });
    res.status(201).send(instrumentItems[index]);
  } else {
    next(new Error("The id was not found"));
  }
});

// DELETE
router.delete("/itemsIntake/:id", (req, res, next) => {
  if (
    instrumentItems.findIndex((instrumentItems) => {
      return instrumentItems._id == req.params.id;
    }) != -1
  ) {
    let index = instrumentItems.findIndex((instrumentItems) => {
      return instrumentItems._id == req.params.id;
    });
    instrumentItems.splice(index, 1);
    res.status(201).send(instrumentItems);
  } else {
    next(new Error("The id was not found"));
  }
});

router.get("*", (req, res, next) => {
  next(new Error("This route was not found"));
});

module.exports = router;
