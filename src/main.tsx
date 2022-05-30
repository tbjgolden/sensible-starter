import React, { ReactNode, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Navigate, useRoutes } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { theme, primitives } from "_/theme";
import { MenuLayout } from "_/components/Layouts";
import routes from "~react-pages";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "_/styles/reset.scss";
import "_/styles/tags.scss";
import "_/styles/typography.scss";
import "_/styles/spacing-defaults.scss";
import "_/styles/spacing-scale.scss";
import "_/styles/custom.scss";
import { Spinner } from "baseui/spinner";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_KEYSTONE_BASE_URL}/api/graphql`,
  cache: new InMemoryCache(),
});

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

const AppWrappers = ({ children }: { children?: ReactNode }) => {
  return (
    // Enables styletron magic
    <StyletronProvider value={engine}>
      {/* Enables baseweb theme logic */}
      <BaseProvider theme={theme}>
        {/* Enables apollo caching logic */}
        <ApolloProvider client={client}>
          {/* Opt-out of legacy React nonsense */}
          <React.StrictMode>
            {/* Enables react-router logic */}
            <Router>{children}</Router>
          </React.StrictMode>
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
          element:
            routes.length === 0 ? (
              <MenuLayout>
                <h1 style={{ color: "var(--mono600)" }}>Page Not Found</h1>
              </MenuLayout>
            ) : (
              <Navigate to="/" />
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
