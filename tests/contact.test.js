const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");

const Onecontact = {
  firstname_lastname: "John Doeuf",
  email: "test@gmail.com",
  phone: "123456",
};

describe("app", () => {
  beforeAll(async () => {
    const sql = "TRUNCATE TABLE contact";
    await query(sql);
  });

  it("GETs /api/contact/ and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/contact/").expect(200);
    expect(res.body.length).toEqual(0);
  });

  it("POSTs /api/contact/ and should obtain { id:1, firstname_lastname: 'John Doeuf', email: 'test@gmail.com', phone: '123456}", async () => {
    expect.assertions(2);
    const res = await request(app).post("/api/contact/").send(Onecontact).expect(201);
    expect(res.body.id).toEqual(1);
    expect(res.body.firstname_lastname).toEqual("John Doeuf");
  });

  it("GETs /api/users/1 and should obtain { id:1, firstname_lastname: 'John Doeuf', email: 'test@gmail.com', phone: '123456'}", async () => {
    expect.assertions(2);
    const res = await request(app).get("/api/contact/1").expect(200);
    expect(res.body.id).toEqual(1);
    expect(res.body.phone).toEqual("123456");
  });
});
