const fs = require("fs/promises");
const { skuStringToObject, applyOffer, applyMultibuy, applyNoOffer, validateString } = require("../utils");

exports.readEndpoints = async () => {
    const result = await fs.readFile("./endpoints.json", "utf-8");
    const file = JSON.parse(result);
    return file;
};

exports.readOffers = async () => {
    const result = await fs.readFile("./offers.json", "utf-8");
    const file = JSON.parse(result);
    return file;
}

exports.calculateTotalBasketPrice = async (skuString) => {
    if (validateString(skuString)) {
        const upperString = skuString.toUpperCase();
        // reads the offers.json file for current offers
        let offers = await exports.readOffers()
        let activeObject = skuStringToObject(upperString)
        // applies offers sequentially, passing in the modified object each time
        let appliedOffers = applyOffer(activeObject, offers);
        let appliedMultibuyOffers = applyMultibuy(activeObject, offers);
        let appliedNoOffers = applyNoOffer(activeObject, offers);
        totalValue = appliedOffers + appliedMultibuyOffers + appliedNoOffers
        return totalValue;
    }
    else {
        return Promise.reject("Invalid string");
    }
}
