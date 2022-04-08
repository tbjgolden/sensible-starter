import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { theme, primitives } from "_/theme";
import routes from "~react-pages";
import "_/global.css";

// Make primitives available as CSS properties
const styleEl = document.createElement("style");
let customPropertiesCSS = "";
for (const [k, v] of Object.entries(primitives)) {
  customPropertiesCSS += `--${k}:${v};`;
}
styleEl.innerHTML = `:root{${customPropertiesCSS}}`;
document.head.append(styleEl);

// Initialise and attach React app to DOM
const engine = new Styletron();

const App = () => {
  return <Suspense fallback={<div />}>{useRoutes(routes)}</Suspense>;
};

ReactDOM.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={theme}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </BaseProvider>
  </StyletronProvider>,
  document.querySelector("#root")
);
