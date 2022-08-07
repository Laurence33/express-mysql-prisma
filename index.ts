import cookieParser from "cookie-parser";
import express, { Express } from "express";
import dotenv from "dotenv";
import apiRouter from "./src/routes/index";
import fs from "fs";

// Load env variables
dotenv.config();
// Load Keys
process.env.PRIVATE_KEY = fs.readFileSync("./jwtRS256.key").toString();
process.env.PUBLIC_KEY = fs.readFileSync("./jwtRS256.key.pub").toString();
// Instantiate express app
const app: Express = express();
const port = process.env.EXPRESS_PORT || 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log("Express server running on port", port);
});
