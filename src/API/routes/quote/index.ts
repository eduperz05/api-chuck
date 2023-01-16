import { Router } from "express";
import paginate from "express-paginate";
import { randomController, searchController } from "../../controllers/quote";


export const router = Router();

router.get("/random", randomController);
router.get("/random/:category", randomController);
router.get("/search/:search", [paginate.middleware(5, 20)], searchController);