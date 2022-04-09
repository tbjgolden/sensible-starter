import {
  useHref,
  useLinkClickHandler,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { StyledLink, LinkProps as UILinkProps } from "baseui/link";

export type LinkProps = RouterLinkProps & UILinkProps & { to: string };

export const Link = ({
  onClick,
  reloadDocument,
  replace = false,
  state,
  target,
  to,
  ...rest
}: LinkProps) => {
  const href = useHref(to);
  const internalOnClick = useLinkClickHandler(to, { replace, state, target });
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented && !reloadDocument) {
      internalOnClick(event);
    }
  }

  const isExternal = new URL(to, location.origin).origin !== location.origin;

  return isExternal ? (
    <StyledLink
      {...rest}
      href={to}
      onClick={(event) => {
        if (onClick) onClick(event);
      }}
      target={target}
    />
  ) : (
    <StyledLink {...rest} href={href} onClick={handleClick} target={target} />
  );
};
