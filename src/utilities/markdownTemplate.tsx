import { MenuLayout } from "_c/Layouts";
import Slot from "slot";

/**
  THIS FILE IS A TEMPLATE:
    1. Write a file: src/pages/.../<your-file>.md
    2. Run `npm run md-to-tsx` to generate a TSX file
    3. The new route is created, but to add to the menu,
       you should update MENU_ITEMS in src/components/Layouts.tsx
    NOTE. You might want to keep your .md source file where
          it is if you'd like to edit it later.

  - Do not edit/delete this comment; it is auto-removed from output
  - the import Slot line is replaced with any extra imports
  - Slot is a fake component that is replaced by JSX
*/

const ComponentName = () => {
  return (
    <MenuLayout>
      <Slot />
    </MenuLayout>
  );
};

export default ComponentName;
