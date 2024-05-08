import express from "express";
import { AudionalsController } from "./AudionalsController.js";

const router = express.Router();
const controller = new AudionalsController();

router.get("/convert/:inscriptionId", async (req, res, next) => {
  try {
    console.log(req.params.inscriptionId)
    const response = await controller.process(req.params.inscriptionId);
    return res.send(response);
  } catch (error) {
    console.log('Error in routes: ', error)
    next('An error occurred fetching sbtc data.') 
  }
});

router.get("/collect/:inscriptionId", async (req, res, next) => {
  try {
    console.log(req.params.inscriptionId)
    const response = await controller.collect(req.params.inscriptionId);
    return res.send(response);
  } catch (error) {
    console.log('Error in routes: ', error)
    next('An error occurred fetching sbtc data.') 
  }
});

export { router as audionalsRoutes }
