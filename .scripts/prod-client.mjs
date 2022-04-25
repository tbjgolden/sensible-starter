#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";

const PORT = process.env.PORT || 3000;
const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const app = express();
app.use(morgan("combined"));
app.use(helmet());
app.use(compression());
app.use(
  "/assets",
  express.static(path.join(projectRoot, "dist", "assets"), {
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "max-age=604800");
    },
  })
);
app.use(express.static(path.join(projectRoot, "dist")));
app.use(function (req, res, next) {
  if (req.method === "GET") {
    res.sendFile(path.join(projectRoot, "dist", "index.html"));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Started: http://localhost:${PORT}`);
});
