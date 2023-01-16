import express, { urlencoded } from "express";
import cors from "cors"; 
import { errorHandler } from "./middlewares/errorHandler";
import { router } from "./API/routes/quote";


const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Prepare urself for the greatest API ever.");
});

app.use("/quote", router);

// Error handler
app.use(errorHandler);

export default app;


