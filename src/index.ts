import app from "./server";
import { connectDB } from "./bin/migrate";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 3000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
  });
}).catch((err: unknown) => {
  console.log(err);
});