// this catches runtime errors and sends them to keystone
// a long-term app should probably replace this with sentry

// note: deliberately ES5 friendly; do not change
let MAX_UNIQUE_ERRORS = 20;
const MAX_STACK_LENGTH = 3;

function shortenStackLength(str: string): string {
  return str.split("\n").slice(0, MAX_STACK_LENGTH).join("\n");
}

function asSafe(str: string): string {
  return JSON.stringify(JSON.stringify(str)).slice(1, -1);
}

const MAGIC_OBJECT = Object.create(null);
const errorSet = Object.create(null);

window.addEventListener("error", function (event) {
  try {
    if (!event.message.includes("ResizeObserver loop")) {
      const message = event.message || "";
      const fileName = event.filename || "";
      const lineNum = event.lineno || 0;
      const colNum = event.colno || 0;

      const uniqueErrorKey = JSON.stringify([fileName, lineNum, colNum, message]);

      if (errorSet[uniqueErrorKey] !== MAGIC_OBJECT && MAX_UNIQUE_ERRORS-- > 0) {
        errorSet[uniqueErrorKey] = MAGIC_OBJECT;

        const xhr = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : // eslint-disable-next-line @typescript-eslint/no-explicit-any
            new (window as any).ActiveXObject("Microsoft.XMLHTTP");
        xhr.open("POST", "//localhost:3001/api/graphql");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          '{"query":"' +
            "mutation{createError(data:{message:" +
            asSafe(message) +
            ",stack:" +
            asSafe(shortenStackLength((event.error && event.error.stack) || "")) +
            ",userAgent:" +
            asSafe(navigator.userAgent || "") +
            ",fileName:" +
            asSafe(fileName) +
            ",lineNum:" +
            lineNum +
            ",colNum:" +
            colNum +
            "}){id}}" +
            '","variables":{}}'
        );
      }
    }
  } catch {
    //
  }
});

export {};
