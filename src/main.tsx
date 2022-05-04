import React, { ReactNode, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { Unstable_A11y as A11y } from "baseui/a11y";
import { theme, primitives } from "_/theme";
import { MenuLayout } from "_c/Layouts";
import routes from "~react-pages";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "_/global.css";

const client = new ApolloClient({
  uri: "//localhost:3001/api/graphql",
  cache: new InMemoryCache(),
});

// eslint-disable-next-line baseui/deprecated-component-api
import { Spinner } from "baseui/spinner";

// Make baseweb primitives available as CSS properties
const styleEl = document.createElement("style");
let customPropertiesCSS = "";
for (const [k, v] of Object.entries(primitives)) {
  customPropertiesCSS += `--${k}:${v};`;
}
styleEl.innerHTML = `:root{${customPropertiesCSS}}`;
document.head.append(styleEl);

// Initialise and attach React app to DOM
const engine = new Styletron();

// Loading indicator (that only appears after 2s, to minimise loading time perception)
const LoadingIndicator = () => {
  const [isLoadingIndicatorVisible, setIsLoadingIndicatorVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoadingIndicatorVisible(true);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return isLoadingIndicatorVisible ? <Spinner $size={100} /> : null;
};

const AccessibilityChecker = ({ children }: { children?: ReactNode }): JSX.Element => {
  return import.meta.env.PROD ? <>{children}</> : <A11y>{children}</A11y>;
};

const AppWrappers = ({ children }: { children?: ReactNode }) => {
  return (
    // Enables styletron magic
    <StyletronProvider value={engine}>
      {/* Enables baseweb theme logic */}
      <BaseProvider theme={theme}>
        {/* Enables apollo caching logic */}
        <ApolloProvider client={client}>
          {/* Warns of accessibility errors (unless in prod) */}
          <AccessibilityChecker>
            {/* Opt-out of legacy React nonsense */}
            <React.StrictMode>
              {/* Enables react-router logic */}
              <Router>{children}</Router>
            </React.StrictMode>
          </AccessibilityChecker>
        </ApolloProvider>
      </BaseProvider>
    </StyletronProvider>
  );
};

const App = () => {
  return (
    <Suspense
      fallback={
        <MenuLayout>
          <LoadingIndicator />
        </MenuLayout>
      }
    >
      {useRoutes([
        ...routes,
        {
          path: "*",
          element: (
            <MenuLayout>
              <h1 style={{ color: "var(--mono600)" }}>Page Not Found</h1>
            </MenuLayout>
          ),
        },
      ])}
    </Suspense>
  );
};

ReactDOM.render(
  <AppWrappers>
    <App />
  </AppWrappers>,
  document.querySelector("#root")
);
