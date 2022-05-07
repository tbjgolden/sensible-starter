import { ReactNode, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu as MenuIcon } from "baseui/icon";
import { Navigation, Item } from "baseui/side-navigation";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { Drawer } from "_/components/Drawer";
import { Button } from "baseui/button";

const isBigMQ = matchMedia("(min-width: 720px)");

export const ResponsiveNav = ({
  children,
  items,
  hasDefaultPadding = true,
  width = 240,
  title = null,
}: {
  children?: ReactNode;
  items: Item[];
  title?: React.ReactNode;
  width?: number;
  hasDefaultPadding?: boolean;
}) => {
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(!isBigMQ.matches);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const mainContentPaddingClass = hasDefaultPadding
    ? `phx ${isSmall ? "pv32" : "pv64"}`
    : "";

  useEffect(() => {
    const onChange = () => {
      const isSmall = !isBigMQ.matches;
      setIsSmall(isSmall);

      // close menu when resizing from big->small
      // e.g. if a user opens the mobile menu, resizes to desktop, then
      // resizes back to mobile, they'd expect the mobile menu to be closed
      if (!isSmall) {
        setIsMobileNavOpen(false);
      }
    };
    isBigMQ.addEventListener("change", onChange);
    return () => {
      isBigMQ.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <div
      style={{
        display: isSmall ? "block" : "flex",
        paddingLeft: isSmall ? 0 : width,
      }}
    >
      {isSmall ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            background: "#fff",
            zIndex: 99,
            boxShadow: "rgba(0,0,0,0.16) 0 0 12px",
          }}
        >
          <HeaderNavigation
            overrides={{
              Root: {
                style: {
                  paddingTop: 0,
                  paddingBottom: 0,
                  borderBottomWidth: 0,
                },
              },
            }}
          >
            <StyledNavigationList $align={ALIGN.left}>
              {title ? (
                <StyledNavigationItem>
                  <span className="H">{title}</span>
                </StyledNavigationItem>
              ) : null}
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.center} />
            <StyledNavigationList $align={ALIGN.right}>
              <StyledNavigationItem>
                <div ref={containerElRef}>
                  <Button
                    onClick={() => {
                      setIsMobileNavOpen(true);
                    }}
                  >
                    <MenuIcon size={28} />
                  </Button>
                  <Drawer
                    isOpen={isMobileNavOpen}
                    autoFocus
                    onClose={() => {
                      setIsMobileNavOpen(false);
                    }}
                    overrides={{
                      Root: {
                        style: {
                          zIndex: 999,
                        },
                      },
                      DrawerContainer: {
                        style: {
                          width: `${width}px`,
                        },
                      },
                      DrawerBody: {
                        style: {
                          marginTop: "48px",
                          marginLeft: 0,
                          marginRight: 0,
                          marginBottom: 0,
                        },
                      },
                    }}
                  >
                    <Navigation
                      items={items}
                      activeItemId={location.pathname}
                      onChange={({ event, item }) => {
                        event.preventDefault();
                        navigate(item.itemId);
                      }}
                      overrides={{
                        NavItem: {
                          style: {
                            borderLeftWidth: 0,
                          },
                        },
                      }}
                    />
                  </Drawer>
                </div>
              </StyledNavigationItem>
            </StyledNavigationList>
          </HeaderNavigation>
        </div>
      ) : (
        <div
          className="pv64"
          style={{
            width,
            height: "100vh",
            background: "#fff",
            borderRight: "1px solid var(--mono500)",
            position: "fixed",
            zIndex: 998,
            left: 0,
            overflowY: "auto",
          }}
        >
          {title ? (
            <div className="H-M ph24 pv12" style={{ border: "2px solid transparent" }}>
              {title}
            </div>
          ) : null}
          <Navigation
            items={items}
            activeItemId={location.pathname}
            onChange={({ event, item }) => {
              event.preventDefault();
              navigate(item.itemId);
            }}
          />
        </div>
      )}
      <div
        style={{
          flex: "0 0 auto",
          width: "100%",
          overflowY: "hidden",
          position: "relative",
          paddingTop: isSmall ? 56 : 0,
        }}
      >
        <div className={mainContentPaddingClass}>{children}</div>
      </div>
    </div>
  );
};
