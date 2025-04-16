import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import editorRoutes from "../src/api/v1/routes/editorRoutes";
import * as editorController from "../src/api/v1/controllers/editorController";

// Setup express test app
const app = express();
app.use(express.json());
app.use("/api/v1/editors", editorRoutes);

//  Mock controller functions
jest.mock("../src/api/v1/controllers/editorController", () => ({
  getEditorDetails: jest.fn((req: Request, res: Response) =>
    res.status(200).send("editor details")
  ),
  updateEditorDetails: jest.fn((req: Request, res: Response) =>
    res.status(200).send("editor updated")
  ),
}));

// Mock authenticate middleware (named export)
jest.mock("../src/api/v1/middleware/authenticate", () => ({
  authenticate: (req: Request, res: Response, next: NextFunction) => {
    res.locals.uid = "editorUser";
    next();
  },
}));

//  Mock isAuthorized middleware (default export)
jest.mock("../src/api/v1/middleware/authorize", () => ({
  __esModule: true,
  default: () => (req: Request, res: Response, next: NextFunction) => {
    res.locals.role = "editor";
    next();
  },
}));

describe("Editor Routes (with middleware)", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/editors/:id", () => {
    it("should call getEditorDetails after passing through middleware", async () => {
      const res = await request(app)
        .get("/api/v1/editors/123")
        .set("Authorization", "Bearer mockToken");

      expect(res.statusCode).toBe(200);
      expect(editorController.getEditorDetails).toHaveBeenCalled();
    });
  });

  describe("PUT /api/v1/editors/:id", () => {
    it("should call updateEditorDetails after passing through middleware", async () => {
      const updatedEditor = {
        name: "Updated Editor",
        email: "editor@example.com",
      };

      const res = await request(app)
        .put("/api/v1/editors/123")
        .set("Authorization", "Bearer mockToken")
        .send(updatedEditor);

      expect(res.statusCode).toBe(200);
      expect(editorController.updateEditorDetails).toHaveBeenCalled();
    });
  });
});
