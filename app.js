import express from "express";
import { config } from "dotenv";
import userRouter from "./routes/userRouter.js";
import bodyParser from "body-parser";
import cors from "cors";
import mongodb from "./dbconfig.js";

config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
mongodb();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "Content-Type",
    "Authorization"
  );
  next();
});

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
