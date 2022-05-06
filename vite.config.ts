import "dotenv/config";

import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import pages from "vite-plugin-pages";
import { createHtmlPlugin as injectHtml } from "vite-plugin-html";
import { parseHost } from "./.scripts/lib/url";

const NODE_ENV = process.env.NODE_ENV ?? "development";

const frontEndHost = parseHost(process.env.VITE_FRONTEND_HOST ?? "http://localhost:3000");

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    watch: {
      ignored: ["**/tsconfig.json"],
    },
    port: frontEndHost.port,
  },
  resolve: {
    alias: [{ find: "_", replacement: path.resolve(process.cwd(), "src") }],
  },
  plugins: [
    react(),
    // needed for filesystem routing / bundling
    pages(),
    // replace errorCatcher in index.html according to NODE_ENV
    injectHtml({
      inject: {
        data: {
          errorCatcher:
            NODE_ENV === "production"
              ? `<script>var e=20;function t(e){return JSON.stringify(JSON.stringify(e)).slice(1,-1)}var r=Object.create(null),n=Object.create(null);window.addEventListener("error",(function(i){try{if(!i.message.includes("ResizeObserver loop")){var a=i.message||"",s=i.filename||"",o=i.lineno||0,c=i.colno||0,l=JSON.stringify([s,o,c,a]);if(n[l]!==r&&e-- >0){n[l]=r;var u=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");u.open("POST","//localhost:3001/api/graphql"),u.setRequestHeader("Content-Type","application/json"),u.send('{"query":"mutation{createError(data:{message:'+t(a)+",stack:"+t((i.error&&i.error.stack||"").split("\\n").slice(0,3).join("\\n"))+",userAgent:"+t(navigator.userAgent||"")+",fileName:"+t(s)+",lineNum:"+o+",colNum:"+c+'}){id}}","variables":{}}')}}}catch(e){}}))</script>`
              : "",
        },
      },
    }),
  ],
});
