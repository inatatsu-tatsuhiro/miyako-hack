import { Request, Response } from "express";
import { Config } from "../utils/Config";

export async function healthHandler(req: Request, res: Response) {
  res.send({ status: "OK", node: Config.config.nodeUrl });
}
