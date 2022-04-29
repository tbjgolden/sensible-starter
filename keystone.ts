import "dotenv/config";
import { config, list } from "@keystone-6/core";
import { text, password, timestamp, checkbox, integer } from "@keystone-6/core/fields";
import { createAuth } from "@keystone-6/auth";
import { statelessSessions } from "@keystone-6/core/session";

const DEV_SECRET = "---------- DEV SECRET ----------";
const sessionSecret = process.env.SESSION_SECRET || DEV_SECRET;
if (process.env.NODE_ENV === "production" && sessionSecret === DEV_SECRET) {
  throw new Error("The SESSION_SECRET environment variable must be set in production");
}

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
    db: {
      provider: "sqlite",
      url: "file:./keystone.db",
    },
    server: {
      cors: {
        origin: "http://localhost:3000",
      },
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
          // relationships can also be added to keystone
          // listItems: relationship({ ref: "ListItem.author", many: true }),
        },
      }),
      ListItem: list({
        fields: {
          name: text(),
          checked: checkbox(),
          updatedAt: timestamp({
            defaultValue: { kind: "now" },
            ui: {
              createView: {
                fieldMode: "hidden",
              },
            },
          }),
          createdAt: timestamp({
            defaultValue: { kind: "now" },
            ui: {
              createView: {
                fieldMode: "hidden",
              },
            },
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
            ui: {
              createView: {
                fieldMode: "hidden",
              },
            },
          }),
        },
      }),
    },
    session: statelessSessions({
      maxAge: 60 * 60 * 24 * 30,
      secret: sessionSecret,
    }),
  })
);
