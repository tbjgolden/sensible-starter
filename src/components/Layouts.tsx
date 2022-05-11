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
    subNav: [
      {
        title: "Directory Structure",
        itemId: "/docs/structure",
      },
      {
        title: "CSS",
        itemId: "/docs/css",
      },
      {
        title: "CRA",
        itemId: "/docs/cra",
      },
    ],
  },
  {
    title: "Test Pages",
    itemId: "/test-pages",
    subNav: [
      {
        title: "Chart",
        itemId: "/test-pages/chart",
      },
      {
        title: "Components",
        itemId: "/test-pages/components",
      },
      {
        title: "List w/ API",
        itemId: "/test-pages/list",
      },
      {
        title: "HTML Test",
        itemId: "/test-pages/html-test",
      },
      {
        title: "CSS Utilities",
        itemId: "/test-pages/css-utilities",
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
