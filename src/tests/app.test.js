const request = require("supertest");
const app = require("../app")


const jsonObject = {
    "GET /api": expect.any(Object),
    "GET /api/offers": expect.any(Object),
    "POST /api": expect.any(Object)
}


describe("GET /api", () => {
    test("Should respond to a GET request", () => {
        return request(app)
        .get("/api")
        .then(response => {
            expect(response.statusCode).toBe(200);
        })
    }),
    
    test("Should return a JSON array of endpoints", () => {
        return request(app)
        .get("/api")
        .then(response => {
            expect(response.body).toMatchObject(jsonObject)
            expect(response.statusCode).toBe(200);
        })
    })
})

describe("POST /api", () => {
    test("Should respond to a POST request", () => {
        return request(app)
        .post("/api")
        .then(response => {
            expect(response.body).toStrictEqual({"msg": "Invalid string"});
        })
    }),
    test("Should return a total value in response to a valid SKU string", () => {
        return request(app)
        .post("/api")
        .send({skuString: "AAABBBCCC"})
        .then(response => {
            expect(response.body).toStrictEqual({"price":265})
        })
    }),
    test("Should return a total value in response to an valid SKU string", () => {
        return request(app)
        .post("/api")
        .send({skuString: "ABCDDCBA"})
        .then(response => {
            expect(response.body).toStrictEqual({"price":215})
        })
    })
})