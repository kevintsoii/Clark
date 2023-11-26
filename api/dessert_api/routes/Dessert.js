const express = require("express");
const router = express.Router();
const Dessert = require("../models/Dessert");
const {
  checkIfTokenSent,
  checkIfTokenValid,
} = require('../../main_endpoints/util/token-functions');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND
} = require("../../util/constants").STATUS_CODES;
const membershipState = require('../../util/constants').MEMBERSHIP_STATE;

router.post('/createDessert', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.OFFICER)) {
    return res.sendStatus(UNAUTHORIZED);
  }

  const { rating } = req.body;
  const numberSent = !Number.isNaN(Number(rating));

  const newEvent = new Dessert({
    title: req.body.title,
    description: req.body.description,
    rating: numberSent ? Number(rating) : undefined,
  });

  Dessert.create(newEvent)
    .then((post) => {
      return res.json(post);
    })
    .catch((error) => res.sendStatus(BAD_REQUEST));
});

router.get('/getDesserts', (req, res) => {
  Dessert.find()
    .then((items) => res.status(OK).send(items))
    .catch((error) => {
      res.sendStatus(BAD_REQUEST);
    });
});

router.post('/editDessert', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.OFFICER)) {
    return res.sendStatus(UNAUTHORIZED);
  }

  const { title, description, rating, _id } = req.body;
  Dessert.findOne({ _id })
    .then((Dessert) => {
      Dessert.title = title || Dessert.title;
      Dessert.description = description || Dessert.description;
      Dessert.rating = rating != "" && !Number.isNaN(Number(rating)) ? Number(rating) : undefined;
      Dessert.save()
        .then(() => {
          res.sendStatus(OK);
        })
        .catch(() => {
          res.sendStatus(BAD_REQUEST);
        });
    })
    .catch(() => {
      res.sendStatus(NOT_FOUND);
    });
});

router.post('/deleteDessert', (req, res) => {
  if (!checkIfTokenSent(req)) {
    return res.sendStatus(FORBIDDEN);
  } else if (!checkIfTokenValid(req, membershipState.OFFICER)) {
    return res.sendStatus(UNAUTHORIZED);
  }

  Dessert.deleteOne({ _id: req.body._id })
    .then((result) => {
      if (result.n < 1) {
        res.sendStatus(NOT_FOUND);
      } else {
        res.sendStatus(OK);
      }
    })
    .catch(() => {
      res.sendStatus(BAD_REQUEST);
    });
});

module.exports = router;
