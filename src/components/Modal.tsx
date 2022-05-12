/* eslint-disable @typescript-eslint/no-restricted-imports */
import { Modal as BaseWebModal, ModalProps } from "baseui/modal";
export {
  ModalButton,
  FocusOnce,
  StyledRoot,
  StyledDialog,
  StyledDialogContainer,
  StyledClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "baseui/modal";
export type {
  SharedStylePropsArg,
  ModalOverrides,
  ModalProps,
  ModalState,
} from "baseui/modal";

export const Modal = ({ overrides, ...props }: ModalProps | Readonly<ModalProps>) => {
  return (
    <BaseWebModal
      {...props}
      overrides={{
        ...overrides,
        Root: {
          ...overrides?.Root,
          style: {
            zIndex: 999,
          },
        },
        DialogContainer: {
          ...overrides?.DialogContainer,
          style: {
            backgroundColor: "rgba(127,127,127,.5)",
          },
        },
      }}
    />
  );
};
