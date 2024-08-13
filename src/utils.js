exports.skuStringToObject = (skuString) => {
    // parses SKU string into a key-value object detailing the number of each character
    let skuObject = {};
    if (!skuString) {
        skuObject = {
            "msg": "No input received for SKU string"
        }
        return skuObject;
    }
    // if no key exists for the iterated value exists, create one
    for (let i = 0; i < skuString.length; i++) {
        if (!skuObject[skuString[i]]) {
            skuObject[skuString[i]] = 1;
        } else {
            // increment value for found key
            skuObject[skuString[i]] += 1
        }
    }
    return skuObject;
}

exports.validateString = (skuString) => {
    // regex to check if string is alphanumeric
    if(skuString) {
        return /^[a-zA-Z]+$/.test(skuString);
    }
    else {
        return false
    }
}

exports.applyOffer = (skuString, skuObject, offers) => {
    /* In this function, I would ideally reduce the SKU string in a manner fitting some of the multi-selection
    choices available in the offers.json i.e. search for a substring "ABC", calculate the value of the offer, remove
    the substring and pass it down to the next offer-applying function. This is an alternative to the current
    method of generating an object and calculating from there.
    */
    return 0;
}

exports.applyMultibuy = (skuObject, offers) => {
    let totalOfferValue = 0;
    let finalValue = 0;

    for (let i = 0; i < Object.keys(offers.multiBuy).length; i++) {
        const currentOfferKey = Object.keys(offers.multiBuy)[i]
        const currentOfferValue = Object.values(offers.multiBuy)[i]
        if (skuObject.hasOwnProperty(currentOfferKey)) {
            // check to see if key in object has a corresponding key in offers table
            const numberOfItems = skuObject[currentOfferKey]
            const itemPrice = currentOfferValue.price
            const itemsNeededForOffer = currentOfferValue.offerItem;
            const offerValue = currentOfferValue.offerValue
            const timesOfferApplied = numberOfItems / itemsNeededForOffer
            const remainder = numberOfItems % itemsNeededForOffer
            const remainderValue = remainder * itemPrice
            if (remainder > 0) {
                skuObject[currentOfferKey] -= remainder
            }
            // removes SKU letters with applied offers
            skuObject[currentOfferKey] -= (Math.floor(timesOfferApplied) * itemsNeededForOffer)
            totalOfferValue = Math.floor(timesOfferApplied) * offerValue
            finalValue += totalOfferValue + remainderValue
        }
    }
    return finalValue;
}

exports.applyNoOffer = (skuObject, offers) => {
    // after all other offers have been applied, calculate the remainder
    let finalValue = 0;
    const currentOfferKey = Object.keys(offers.noOffer)
    const currentOfferValue = Object.values(offers.noOffer)
    
    for (let i = 0; i < currentOfferKey.length; i++) {
        // check to see if key in object has a corresponding value in the offer table
        if (skuObject.hasOwnProperty(currentOfferKey[i])) {
            const numberOfItems = skuObject[currentOfferKey[i]]
            const itemPrice = currentOfferValue[i].price
            finalValue += (numberOfItems * itemPrice)
            // decrement SKU object with number of items
            skuObject[currentOfferKey[i]] -= numberOfItems
        }
    }
    return finalValue;
}