/* eslint-disable @typescript-eslint/no-restricted-imports */
import { Drawer as BaseWebDrawer, DrawerProps } from "baseui/drawer";
export {
  StyledRoot,
  StyledBackdrop,
  StyledDrawerContainer,
  StyledDrawerBody,
  StyledClose,
} from "baseui/drawer";
export type {
  SharedStylePropsArg,
  DrawerOverrides,
  DrawerProps,
  DrawerState,
} from "baseui/drawer";

export const Drawer = ({ overrides, ...props }: DrawerProps | Readonly<DrawerProps>) => {
  return (
    <BaseWebDrawer
      {...props}
      overrides={{
        ...overrides,
        Backdrop: {
          ...overrides?.Backdrop,
          style: {
            backgroundColor: "rgba(127,127,127,.5)",
          },
        },
      }}
    />
  );
};
