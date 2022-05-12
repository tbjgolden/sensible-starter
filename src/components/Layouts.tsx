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
        title: "How-To Mini Guides",
        itemId: "/docs/mini-guides",
      },
      {
        title: "Components Guide",
        itemId: "/docs/components",
      },
      {
        title: "CSS Utilities Guide",
        itemId: "/docs/css-guide",
      },
    ],
  },
  {
    title: "Test Pages",
    itemId: "/test-pages",
    subNav: [
      {
        title: "Basic Tests",
        itemId: "/test-pages/basics",
      },
      {
        title: "Keystone List Test",
        itemId: "/test-pages/list",
      },
      {
        title: "Chart.js Test",
        itemId: "/test-pages/chart",
      },
      {
        title: "CSS Defaults Test",
        itemId: "/test-pages/html-test",
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
