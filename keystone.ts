import "dotenv/config";
import { config, list } from "@keystone-6/core";
import { text, relationship, password, timestamp, select } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
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
          posts: relationship({ ref: "Post.author", many: true }),
        },
        ui: {
          listView: {
            initialColumns: ["name", "posts"],
          },
        },
      }),
      Post: list({
        fields: {
          title: text(),
          status: select({
            options: [
              { label: "Published", value: "published" },
              { label: "Draft", value: "draft" },
            ],
            defaultValue: "draft",
            ui: {
              displayMode: "segmented-control",
            },
          }),
          content: document({
            formatting: true,
            layouts: [],
            links: true,
            dividers: true,
          }),
          publishDate: timestamp(),
          author: relationship({
            ref: "User.posts",
          }),
          tags: relationship({
            ref: "Tag.posts",
            many: true,
          }),
        },
      }),
      Tag: list({
        ui: {
          isHidden: true,
        },
        fields: {
          name: text(),
          posts: relationship({ ref: "Post.tags", many: true }),
        },
      }),
    },
    session: statelessSessions({
      maxAge: 60 * 60 * 24 * 30,
      secret: sessionSecret,
    }),
  })
);
