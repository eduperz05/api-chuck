import { Router } from "express";
import { createController, randomController, wordController, categoryController } from "../../controllers/quote";


export const router = Router();

router.post("/create", createController);
router.get("/random", randomController);
router.get("/word", wordController);
router.get("/category", categoryController);