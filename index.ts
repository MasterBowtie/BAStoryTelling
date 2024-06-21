import fs from 'node:fs';
import dotenv from 'dotenv';
import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';

// import controllers
import { buildHomeController } from './server/controllers/home_controller';

const app = express()
const port = 3000

dotenv.config();

export const DEBUG = process.env.NODE_ENV !== "production";
export const MANIFEST: Record<string, any> = DEBUG ? {} : JSON.parse(fs.readFileSync("static/.vite/manifest.json").toString())
console.log(DEBUG);

// Configure handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
});

// Serve static assets
if (!DEBUG) {
  app.use(express.static('static'));
} else {

  app.use((req, res, next) => {
    console.log(req.url);
    if (req.url.includes(".")) {
      res.redirect(`${process.env.ASSET_URL}/${req.url}`)
    } else {
      next();
    }
  });
}

app.use("/", buildHomeController());

// Start the server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}...`);
});