const { calculateTotalBasketPrice, readEndpoints, readOffers } = require("../models/checkoutModel");

exports.getAPI = (req, res, next) => {
    readEndpoints()
    .then((endpoints) => {
        res.status(200).send(endpoints);
    })
    .catch((err) => {
        next(err);
    })
}

exports.getOffers = (req, res, next) => {
    readOffers()
    .then((offers) => {
        res.status(200).send(offers);
    })
    .catch((err) => {
        next(err);
    })
}

exports.postStringSKU = (req, res, next) => {
    const message = req.body.skuString;
    calculateTotalBasketPrice(message)
    .then((totalPrice) => {
        res.status(200).send({"price": totalPrice});
    })
    .catch((err) => {
        next(err);
    })
}