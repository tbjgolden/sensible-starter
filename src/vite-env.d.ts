/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client-react" />

declare module "slot" {
  import { ReactElement } from "react";

  export default ReactElement();
}
