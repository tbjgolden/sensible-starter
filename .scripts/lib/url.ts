import { URL } from "node:url";

export const parseHost = (
  host: string,
  ensureNoPath = true
): {
  origin: string;
  protocol: string;
  host: string;
  pathname: string;
  search: string;
  hash: string;
  port: number;
} => {
  let url;
  try {
    url = new URL(host);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(`${host} is not a complete/valid host url`);
    throw error;
  }
  const port =
    Number.parseInt(url.port || (url.protocol === "https:" ? "443" : "80")) || 80;

  if (ensureNoPath && url.pathname !== "/") {
    throw new Error(`${host} must not include a path`);
  }

  return {
    origin: url.origin,
    protocol: url.protocol,
    host: url.host,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
    port,
  };
};
