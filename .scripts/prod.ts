#!/usr/bin/env node
/* eslint-disable no-console */
import "dotenv/config";

import path from "node:path";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { parseHost } from "./lib/url";
import { getProjectRoot } from "./lib/project";

const DEV_SECRET = "---------- DEV SECRET ----------";
const sessionSecret = process.env.SESSION_SECRET || DEV_SECRET;
if (sessionSecret === DEV_SECRET) {
  console.error("Copy .env.example to .env and edit the variables");
  process.exit(1);
}

const frontEndHost = parseHost(process.env.VITE_FRONTEND_HOST ?? "http://localhost:3000");

const main = async () => {
  const projectRoot = await getProjectRoot();

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
      setHeaders: (response) => {
        response.setHeader("Cache-Control", "max-age=31536000, immutable");
      },
    })
  );
  // un-perma-cacheable static files
  app.use(express.static(path.join(projectRoot, "dist")));
  // redirect 404 GET requests to the index.html file
  // to allow react-router to handle them
  app.use((request, response, next) => {
    if (request.method === "GET") {
      response.sendFile(path.join(projectRoot, "dist", "index.html"));
    } else {
      next();
    }
  });

  app.listen(frontEndHost.port, () => {
    console.log(`Started: ${frontEndHost.host}`);
  });
};

main();
