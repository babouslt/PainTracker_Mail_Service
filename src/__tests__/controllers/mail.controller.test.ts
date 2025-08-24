import request from "supertest";
import express from "express";
import { sendMailController } from "../../controllers/mail.controller";

describe("Mail Controller", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.post("/mail", sendMailController);
  });

  describe("POST /mail", () => {
    it("should return 400 if to field is missing", async () => {
      const response = await request(app).post("/mail").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Champ requis : to");
    });

    it("should return 400 if to field is empty", async () => {
      const response = await request(app).post("/mail").send({
        to: "",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Champ requis : to");
    });

    it("should return 400 if to field is undefined", async () => {
      const response = await request(app).post("/mail").send({
        to: undefined,
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Champ requis : to");
    });

    it("should return 400 if to field is null", async () => {
      const response = await request(app).post("/mail").send({
        to: null,
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Champ requis : to");
    });

    it("should return 400 if to field is whitespace only", async () => {
      const response = await request(app).post("/mail").send({
        to: "   ",
      });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Champ requis : to");
    });
  });
});
