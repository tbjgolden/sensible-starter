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

// a request logger
app.use(morgan("combined"));
// general security
app.use(
  helmet({
    // if using nginx as a reverse proxy, re-enable this
    contentSecurityPolicy: false,
  })
);

// gzip compression
app.use(compression());
// perma-cacheable static files
app.use(
  "/assets",
  express.static(path.join(projectRoot, "dist", "assets"), {
    setHeaders: (res) => {
      res.setHeader("Cache-Control", "max-age=31536000, immutable");
    },
  })
);
// un-perma-cacheable static files
app.use(express.static(path.join(projectRoot, "dist")));
// redirect 404 GET requests to the index.html file
// to allow react-router to handle them
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.sendFile(path.join(projectRoot, "dist", "index.html"));
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`Started: http://localhost:${PORT}`);
});
