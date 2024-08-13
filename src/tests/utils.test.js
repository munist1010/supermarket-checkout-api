const { skuStringToObject, validateString, applyMultibuy, applyNoOffer } = require("../utils")

const errorSKU = {
    "msg": "No input received for SKU string"
}

const objectSKU = { 
    A: expect.any(Number), 
    B: expect.any(Number)
}

const offers = {
    "selectBuy": {
        "ABC": {
            "price": 100,
            "offerType": "selectBuy",
            "offerItem": 3,
            "offerValue": 60
        },
        "AB": {
            "price": 80,
            "offerType": "selectBuy",
            "offerItem": 2,
            "offerValue": 50
        }
    },
    "multiBuy": {
        "A": {
            "price": 50,
            "offerType": "multiBuy",
            "offerItem": 3,
            "offerValue": 130
        },
        "B": {
            "price": 30,
            "offerType": "multiBuy",
            "offerItem": 2,
            "offerValue": 45
        }
    },
    "noOffer": {
        "C": {
            "price": 20,
            "offerType": "No offer",
            "offerItem": 1,
            "offerValue": 20
        },
        "D": {
            "price": 15,
            "offerType": "No offer",
            "offerItem": 1,
            "offerValue": 15
        }
    }
}


describe("skuStringToObject", () => {
    test("Should return an object", () => {
        expect(skuStringToObject("AB")).toMatchObject(objectSKU);
    }),
    test("Should return a message on receiving nothing / an empty string", () => {
        expect(skuStringToObject("")).toMatchObject(errorSKU);
    })
})

describe("validateString", () => {
    test("Should return a boolean", () => {
        expect(typeof validateString("A")).toBe("boolean")
    }),
    test("Should return true if the string only contains alphabetical characters", () => {
        expect(validateString("A")).toBe(true)
        expect(validateString("a")).toBe(true)
        expect(validateString("ABB")).toBe(true)
        expect(validateString("AABBCCDD")).toBe(true)
        expect(validateString("1")).toBe(false)
        expect(validateString(2)).toBe(false)
        expect(validateString("")).toBe(false)
        expect(validateString()).toBe(false)
    })
})

describe("applyMultibuy", () => {
    test("Should return an integer", () => {
        expect(typeof applyMultibuy(objectSKU, offers)).toBe("number")
    }),
    test("Should return correct value for given SKU letters", () => {
        expect(applyMultibuy({"A": 3, "B": 2}, offers)).toBe(175)
        expect(applyMultibuy({"A": 5, "B": 4}, offers)).toBe(320)
        expect(applyMultibuy({"A": 6, "B": 6}, offers)).toBe(395)
        expect(applyMultibuy({"A": 0, "B": 0}, offers)).toBe(0)
    })
})

describe("applyNoOffer", () => {
    test("Should return an integer", () => {
        expect(typeof applyNoOffer(objectSKU, offers)).toBe("number")
    }),
    test("Should return correct value for given SKU letters", () => {
        expect(applyNoOffer({"C": 3, "D": 2}, offers)).toBe(90)
        expect(applyNoOffer({"C": 5, "D": 4}, offers)).toBe(160)
        expect(applyNoOffer({"C": 6, "D": 6}, offers)).toBe(210)
        expect(applyNoOffer({"C": 0, "D": 0}, offers)).toBe(0)
    })
})