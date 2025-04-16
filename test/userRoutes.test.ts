import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import userRoutes from "../src/api/v1/routes/userRoutes";
import * as userController from "../src/api/v1/controllers/userControllers";

// Create Express test app and mount the user routes
const app = express();
app.use(express.json());
app.use("/api/v1/users", userRoutes);

//  Mock the controller
jest.mock("../src/api/v1/controllers/userControllers", () => ({
  getUserDetails: jest.fn((req: Request, res: Response) =>
    res.status(200).send("user details")
  ),
}));

//  Mock authenticate middleware as named export
jest.mock("../src/api/v1/middleware/authenticate", () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    res.locals.uid = "testUser";
    next();
  },
}));

//  Mock isAuthorized middleware as default export
jest.mock("../src/api/v1/middleware/authorize", () => ({
  __esModule: true,
  default: () => (req: Request, res: Response, next: NextFunction) => {
    res.locals.role = "admin";
    next();
  },
}));

describe("User Routes (with middleware)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/users/:id", () => {
    it("should call getUserDetails after passing through middleware", async () => {
      const res = await request(app)
        .get("/api/v1/users/123")
        .set("Authorization", "Bearer mockedToken");

      expect(res.statusCode).toBe(200);
      expect(userController.getUserDetails).toHaveBeenCalled();
    });
  });
});
