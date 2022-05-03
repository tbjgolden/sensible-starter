import {
  useHref,
  useLinkClickHandler,
  LinkProps as RouterLinkProps,
  useLocation,
} from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { StyledLink, LinkProps as UILinkProps } from "baseui/link";

export type LinkProps = RouterLinkProps & UILinkProps & { to: string };

/* Shares same API as React Router Link: https://reactrouter.com/docs/en/v6/api#link */
export const Link = ({
  onClick,
  reloadDocument,
  replace = false,
  state,
  target,
  to,
  ...rest
}: LinkProps) => {
  const location = useLocation();
  const href = useHref(to);

  const withHash = `${location.pathname}#`;
  const isHashLink = href.startsWith(withHash);

  const internalOnClick = useLinkClickHandler(to, { replace, state, target });
  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented && !reloadDocument && !isHashLink) {
      internalOnClick(event);
    }
  }

  const isExternal =
    new URL(to, window.location.origin).origin !== window.location.origin;

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
