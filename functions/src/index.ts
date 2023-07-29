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

router.get("/issuer", (req, res) => {
  res.send({
    publicKey:
      "01F6119ABD364B8F87578ED33857FA408F49E4F8B380260D17934413F4262975",
  });
});

const app = express();
app.use("/v1", router);

export const endpoint = onRequest(app);
