import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import express from "express";
import {formHandler} from "./router/Form";
import { healthHandler } from "./router/Health";
import cors from "cors";
import * as admin from "firebase-admin";

admin.initializeApp();

const router = express.Router();

router.use(
  cors({
    exposedHeaders: ["Content-Disposition"],
  })
);

router.post("/form", formHandler);
router.get("/health", healthHandler);

const app = express();
app.use("/v1", router);

export const endpoint = onRequest(app);
