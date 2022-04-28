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
import { Drawer } from "baseui/drawer";
import { Button } from "baseui/button";

export const EmptyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px">
      <div className="mw-copy mh-auto">{children}</div>
    </div>
  );
};

const TITLE_TEXT = "Title";
const MENU_WIDTH = 240;
const MENU_ITEMS: Item[] = [
  { title: "Home", itemId: "/" },
  {
    title: "Nivo Chart",
    itemId: "/map",
  },
  {
    title: "Components",
    itemId: "/components",
  },
  {
    title: "List w/ API",
    itemId: "/list",
  },
  {
    title: "Markdown Generated",
    itemId: "/markdown-generated",
  },
  {
    title: "CSS Utilities",
    itemId: "/css-utilities",
  },
];

const isBigMQ = matchMedia("(min-width: 720px)");

export const MenuLayout = ({ children }: { children: ReactNode }) => {
  const containerElRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(!isBigMQ.matches);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const onChange = () => {
      const isSmall = !isBigMQ.matches;
      setIsSmall(isSmall);
      // close menu when resizing from small->big->small
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
        paddingLeft: isSmall ? 0 : MENU_WIDTH,
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
              <StyledNavigationItem>
                <span className="H">{TITLE_TEXT}</span>
              </StyledNavigationItem>
            </StyledNavigationList>
            <StyledNavigationList $align={ALIGN.center} />
            {/* <StyledNavigationList $align={ALIGN.right}>
              <StyledNavigationItem>
                <Link to="/">Home</Link>
              </StyledNavigationItem>
            </StyledNavigationList> */}
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
                          width: `${MENU_WIDTH}px`,
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
                      items={MENU_ITEMS}
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
            width: MENU_WIDTH,
            height: "100vh",
            background: "#fff",
            borderRight: "1px solid var(--mono500)",
            position: "fixed",
            zIndex: 999,
            left: 0,
          }}
        >
          <div className="H-M ph24 pv12" style={{ border: "2px solid transparent" }}>
            {TITLE_TEXT}
          </div>
          <Navigation
            items={MENU_ITEMS}
            activeItemId={location.pathname}
            onChange={({ event, item }) => {
              event.preventDefault();
              navigate(item.itemId);
            }}
          />
        </div>
      )}
      <main
        className={`phx ${isSmall ? "pv32" : "pv64"}`}
        style={{ flexGrow: 1, flexShrink: 1, marginTop: isSmall ? 72 : 0 }}
      >
        <div className="mw-copy mh-auto rm-margin">{children}</div>
      </main>
    </div>
  );
};
