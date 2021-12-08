const request = require("supertest");
const { query } = require("../db-connection");
const app = require("../src/app");

const user = {
  firstname: "Xa",
  lastname: "Ge",
  email: "test@gmail.com",
  password: "123456",
};

describe("app", () => {
  beforeAll(async () => {
    const sql = "TRUNCATE TABLE users";
    await query(sql);
  });

  it("GETs /api/users/ and should obtain []", async () => {
    expect.assertions(1);
    const res = await request(app).get("/api/users/").expect(200);
    expect(res.body.length).toEqual(0);
  });

  it("POSTs /api/users/ and should obtain { id:1, firstname: 'Xa', lastname: 'Ge', email: 'test@gmail.com'}", async () => {
    expect.assertions(2);
    const res = await request(app).post("/api/users/").send(user).expect(201);
    expect(res.body.id).toEqual(1);
    expect(res.body.firstname).toEqual("Xa");
  });

  it("GETs /api/users/1 and should obtain { id:1, firstname: 'Xa', lastname: 'Ge', email: 'test@gmail.com'}", async () => {
    expect.assertions(2);
    const res = await request(app).get("/api/users/1").expect(200);
    expect(res.body.id).toEqual(1);
    expect(res.body.lastname).toEqual("Ge");
  });
});
