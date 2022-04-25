#!/usr/bin/env node
import { fileURLToPath } from "node:url";
import path from "node:path";
import Fastify from "fastify";
import compress from "fastify-compress";
import helmet from "fastify-helmet";
import staticServer from "fastify-static";
import underPressure from "under-pressure";

const PORT = process.env.PORT || 3000;
const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const fastify = Fastify({
  logger: true,
});
fastify.register(helmet);
fastify.register(compress);
fastify.register(underPressure);
fastify.register(staticServer, {
  root: path.join(projectRoot, "dist"),
});

fastify.listen(PORT, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
