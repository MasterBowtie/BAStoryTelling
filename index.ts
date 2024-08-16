import express from "express";
import path from "path";
import { engine } from 'express-handlebars';
import * as fs from "fs";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import { buildUserController } from "./server/controllers/user_controller";
import { buildSessionController } from "./server/controllers/session_controller";
import { buildHomeController } from "./server/controllers/home_controller";
import { UserRepository } from "./server/repositories/user_repository";


const db = new PrismaClient();
const userRepository = UserRepository.getInstance(db);

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())

const app = express();
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

if (!DEBUG) {
  app.use(express.static('static'));
} else {
  app.use((req, res, next) => {
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}


app.use("/", buildHomeController());
app.use("/user", buildUserController(userRepository));
app.use("/session", buildSessionController(db));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});
