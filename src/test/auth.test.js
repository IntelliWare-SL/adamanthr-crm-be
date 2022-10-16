import app from "../index";
import request from "supertest";
import { User } from "../models/auth.model";

describe("User Auth functionality Test", () => {
  afterAll(async () => {
    app.close();
  });

  describe("Login User functionality", () => {
    it("POST /login", async () => {
      let res = await request(app)
        .post("/api/users/login")
        .send({ email: "kasun@gmail.com", password: "password" });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("token");
      expect(res.body).toHaveProperty("user");
    });
  });

  describe("Register User functionality", () => {
    it("POST /register", async () => {
      await User.findOneAndDelete({ email: "test-user@gmail.com" });
      let res = await request(app).post("/api/users/register").send({
        firstName: "kasin",
        lastName: "Rath",
        email: "test-user@gmail.com",
        password: "password",
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
    });
  });
});
