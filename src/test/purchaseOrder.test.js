import app from "../index";
import request from "supertest";
import { newToken } from "../controllers/userController";
import { PurchaseOrder } from "../models/purchaseOrder.model";

describe("Purchase Order functionality Test", () => {
  afterAll(async () => {
    app.close();
  });

  let jwt;
  beforeAll(() => {
    jwt = `Bearer ${newToken({})}`;
  });

  describe("GET / get all purchase orders", () => {
    it("should return all purchase orders", async () => {
      const res = await request(app)
        .get("/api/purchase_orders")
        .set("Authorization", jwt);
      expect(res.status).toBe(200);
    });
  });

  describe("POST / add a new purchase order", () => {
    it("should add a new purchase orders", async () => {
      const res = await request(app)
        .post("/api/purchase_orders")
        .send({ name: "new", price: 55, qty: 78 })
        .set("Authorization", jwt);
      expect(res.status).toBe(200);
    });
  });

  describe("DELETE / delete a purchase order", () => {
    it("should add a new purchase orders", async () => {
      const newPO = await PurchaseOrder.create({
        name: "testing PO",
        qty: 5,
        price: 5,
      });
      console.log(newPO);
      const res = await request(app)
        .delete(`/api/purchase_orders/${newPO._id}`)
        .send({ name: "new", price: 55, qty: 78 })
        .set("Authorization", jwt);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
    });
  });

  describe("PUT / edit a purchase order", () => {
    it("should add a new purchase orders", async () => {
      const newPO = await PurchaseOrder.create({
        name: "testing PO",
        qty: 5,
        price: 5,
      });
      const res = await request(app)
        .put(`/api/purchase_orders/${newPO._id}`)
        .send({ name: "new 123", price: 55, qty: 78 })
        .set("Authorization", jwt);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
    });
  });
});
