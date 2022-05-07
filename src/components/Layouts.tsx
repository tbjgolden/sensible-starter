import { ReactNode } from "react";
import { Item } from "baseui/side-navigation";
import { ResponsiveNav } from "./ResponsiveNav";

/* Empty Page (No Nav) */
export const EmptyLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="px">
      <div className="mw-copy mh-auto">{children}</div>
    </div>
  );
};

/* Responsive Nav Page */
const MENU_ITEMS: Item[] = [
  { title: "Home", itemId: "/" },
  {
    title: "Docs",
    itemId: "/docs",
    // subNav: [
    //   {
    //     title: "Chart",
    //     itemId: "/docs/chart",
    //   },
    //   {
    //     title: "Components",
    //     itemId: "/docs/components",
    //   },
    //   {
    //     title: "List w/ API",
    //     itemId: "/docs/list",
    //   },
    //   {
    //     title: "HTML Test",
    //     itemId: "/docs/html-test",
    //   },
    //   {
    //     title: "CSS Utilities",
    //     itemId: "/docs/css-utilities",
    //   },
    // ],
  },
  {
    title: "Test Pages",
    itemId: "/test",
    subNav: [
      {
        title: "Chart",
        itemId: "/test/chart",
      },
      {
        title: "Components",
        itemId: "/test/components",
      },
      {
        title: "List w/ API",
        itemId: "/test/list",
      },
      {
        title: "HTML Test",
        itemId: "/test/html-test",
      },
      {
        title: "CSS Utilities",
        itemId: "/test/css-utilities",
      },
    ],
  },
];
export const MenuLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <ResponsiveNav title="Title" items={MENU_ITEMS}>
      <main className="mw-copy mh-auto">
        <div className="rm-margin">{children}</div>
      </main>
    </ResponsiveNav>
  );
};
