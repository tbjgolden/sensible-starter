/* eslint-disable no-console */
import { URL } from "node:url";

/**
abstraction over URL to simplify a few things
  - inference of port for http: and https:
  - port returns as number, not a string
  - pathname never ends with a "/"
*/

export function parseURL(host: string): {
  origin: string;
  protocol: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
  port: number;
} {
  let url: URL;
  try {
    url = new URL(host);
  } catch (error) {
    console.error(`${host} is not a complete/valid url`);
    throw error;
  }
  const port =
    Number.parseInt(url.port || (url.protocol === "https:" ? "443" : "80")) || 80;

  return {
    origin: url.origin,
    protocol: url.protocol,
    host: url.host,
    pathname: url.pathname.endsWith("/") ? url.pathname.slice(0, -1) : url.pathname,
    search: url.search,
    hash: url.hash,
    port,
  };
}
