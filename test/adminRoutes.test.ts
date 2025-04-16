import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import adminRoutes from "../src/api/v1/routes/adminRoutes";
import * as adminController from "../src/api/v1/controllers/adminConroller";

// Setup test app with the real route file
const app = express();
app.use(express.json());
app.use("/api/v1/admin", adminRoutes);

//  Mock the controller
jest.mock("../src/api/v1/controllers/adminConroller", () => ({
  setCustomClaims: jest.fn((req: Request, res: Response) => res.status(200).send("claims set")),
}));

// Mock authenticate middleware as named export
jest.mock("../src/api/v1/middleware/authenticate", () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    // You can inject test user info if needed
    res.locals.uid = "testUser";
    next();
  },
}));

//  Mock isAuthorized middleware as default export
jest.mock("../src/api/v1/middleware/authorize", () => ({
  __esModule: true,
  default: () => (req: Request, res: Response, next: NextFunction) => {
    // You can simulate role checks here if needed
    res.locals.role = "admin";
    next();
  }
}));

describe("Admin Routes (with middleware)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/v1/admin/setCustomClaims", () => {
    it("should call setCustomClaims controller after passing through middleware", async () => {
      const reqBody = {
        uid: "user123",
        claims: { role: "admin" }
      };

      const res = await request(app)
        .post("/api/v1/admin/setCustomClaims")
        .set("Authorization", "Bearer mockedToken")
        .send(reqBody);

      expect(res.statusCode).toBe(200);
      expect(adminController.setCustomClaims).toHaveBeenCalled();
    });
  });
});
