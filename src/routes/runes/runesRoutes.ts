import express from "express";
import { RunesController } from "./RunesController.js";

const router = express.Router();
const controller = new RunesController();

router.get("/ord/version", async (req, res, next) => {
  return res.send(await controller.ordVersion());
});

router.get("/ask/:question", async (req, res, next) => {
  try {
    console.log(req.params.question)
    const response = await controller.question(req.params.question);
    return res.send(response);
  } catch (error) {
    console.log('Error in routes: ', error)
    next('An error occurred fetching sbtc data.') 
  }
});

export { router as runesRoutes }
