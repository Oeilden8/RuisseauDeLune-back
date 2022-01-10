const supertest = require("supertest");

const app = require("../src/app");

const { query } = require("../db-connection");

// Créer un tableau de chaînes de caractères, permettra de vérifier les propriétés de nos contacts
const contactKeys = ["id", "firstname_lastname", "email", "phone"];

// Cet objet permettra de créer un contact dans notre base de données
const contactToCreate = {
  firstname_lastname: "First Contact",
  email: "test@gmail.com",
  phone: "123456",
};

//Permet de tester les routes contact
describe("CONTACT ROUTES", () => {
  beforeAll(async () => {
    await query("TRUNCATE TABLE contact");
  });
  const persistentDatas = {};

  it("should get the contact list 🧪 /api/contact", async () => {
    const res = await supertest(app).get("/api/contact").expect(200).expect("Content-Type", /json/);

    expect(Array.isArray(res.body)).toBe(true);
    // console.log("get", res.body);

    res.body.forEach((contact) => {
      contactKeys.map((prop) => {
        expect(contact).toHaveProperty(prop);
      });
    });
  });

  // permet de tester la route POST et la route doit renvoyer le contact créé en format json
  it("should create a new contact 🧪 /api/contact", async () => {
    const res = await supertest(app).post("/api/contact").send(contactToCreate).expect(201).expect("Content-Type", /json/);

    contactKeys.map((prop) => {
      expect(res.body).toHaveProperty(prop);
    });
    persistentDatas.createdContact = res.body;
  });

  // Permet de tester la route de type GET pour recuperer un contact par son ID
  it("should get the contact with id 1 🧪 /api/contact/1", async () => {
    const res = await supertest(app).get("/api/contact/1").expect(200).expect("Content-Type", /json/);

    contactKeys.map((prop) => {
      expect(res.body).toHaveProperty(prop);
    });
  });

  // Permet de tester la route de type DELETE sur un contact ciblé par son id
  it(`should delete the created contact 🧪 /api/contact/`, async () => {
    await supertest(app).delete(`/api/contact/${persistentDatas.createdContact.id}`).expect(204);

    await supertest(app).get(`/api/contact/${persistentDatas.createdContact.id}`).expect(404);
  });
});
