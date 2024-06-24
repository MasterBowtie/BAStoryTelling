import { Router } from "express";
import { DEBUG, MANIFEST } from "../../index"

export const buildHomeController = () => {
    const router = Router();
    router.get("/", (req, res) => {
      res.render('index', {
        debug: DEBUG,
        jsBundle: DEBUG ? "" : MANIFEST["src/main.tsx"]["file"],
        cssBundle: DEBUG ? "" : MANIFEST["src/main.tsx"]["css"][0],
        assetUrl: process.env.ASSET_URL,
        layout: false
      });
    });
  
    return router;
  }