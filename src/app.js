const express = require("express");
const { postStringSKU, getAPI, getOffers } = require('./controllers/checkoutController');
const { handleCustomErrors, handleServerErrors } = require('./controllers/errorHandlingController');

const app = express();
path = require("path")
app.use(express.static('public'));
app.use(express.json());

app.get("/", (req, res, err) => {
    res.sendFile(__dirname + "/public/app.html")
});

app.get("/api", getAPI);

app.get("/api/offers", getOffers);

app.post("/api", postStringSKU);

app.all("/*", (req, res, next) => {
    res.status(404).send({ msg: "Requested endpoint not found" });
    next();
});

app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;