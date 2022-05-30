/* eslint-disable no-console */
import { config, list } from "@keystone-6/core";
import { text, password, timestamp, checkbox, integer } from "@keystone-6/core/fields";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";
import { getEnv } from "./.scripts/env";
import { parseURL } from "./.scripts/lib/url";

const ENV = getEnv();
if (
  ENV.NODE_ENV === "production" &&
  ENV.SESSION_SECRET === "---------- DEV SECRET ----------"
) {
  throw new Error(
    "The SESSION_SECRET environment variable must be changed for production"
  );
}

const { port } = parseURL(ENV.VITE_KEYSTONE_BASE_URL);
const keystonePort =
  ENV.LOCALHOST_KEYSTONE_PORT === "auto"
    ? port
    : Number.parseInt(ENV.LOCALHOST_KEYSTONE_PORT);

const frontend = parseURL(ENV.VITE_FRONTEND_BASE_URL);
const origin = `${frontend.origin}`;

export default createAuth({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
}).withAuth(
  config({
    db: { provider: "sqlite", url: "file:./keystone.db" },
    server: {
      port: keystonePort,
      cors: { origin },
    },
    ui: {
      isAccessAllowed: (context) => {
        return Boolean(context.session?.data);
      },
    },
    lists: {
      User: list({
        fields: {
          name: text({ validation: { isRequired: true } }),
          email: text({
            validation: { isRequired: true },
            isIndexed: "unique",
            isFilterable: true,
          }),
          password: password({ validation: { isRequired: true } }),
        },
      }),
      ListItem: list({
        fields: {
          name: text(),
          checked: checkbox(),
          updatedAt: timestamp({
            defaultValue: { kind: "now" },
            ui: { createView: { fieldMode: "hidden" } },
          }),
          createdAt: timestamp({
            defaultValue: { kind: "now" },
            ui: { createView: { fieldMode: "hidden" } },
          }),
        },
      }),
      Error: list({
        fields: {
          message: text({ validation: { isRequired: true } }),
          stack: text({ validation: { isRequired: true } }),
          userAgent: text({ validation: { isRequired: true } }),
          fileName: text({ validation: { isRequired: true } }),
          lineNum: integer({ validation: { isRequired: true } }),
          colNum: integer({ validation: { isRequired: true } }),
          createdAt: timestamp({
            defaultValue: { kind: "now" },
            ui: { createView: { fieldMode: "hidden" } },
          }),
        },
      }),
    },
    session: statelessSessions({
      maxAge: 60 * 60 * 24 * 30,
      secret: ENV.SESSION_SECRET,
    }),
  })
);
