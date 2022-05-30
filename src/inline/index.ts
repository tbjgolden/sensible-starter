// Note:
//  - This file is run as an inline script before any other scripts are loaded or run
//  - It is a good place to put polyfills or error catching logic
//  - Do not import/require from this file
//  - Avoid modern JS code where possible, or it'll generate lots of boilerplate
//  - esbuild can't yet handle converting let or const, so use var

var MAX_ERRORS = 20;
var errorCount = 0;
function escapeString(str: string): string {
  return JSON.stringify(JSON.stringify(str)).slice(1, -1);
}

function isFalsePositive(errorEvent: ErrorEvent): boolean {
  return errorEvent.message.indexOf("ResizeObserver loop") !== -1;
}

var uniqueSymbol = Object.create(null);
var errorCache = Object.create(null);
window.addEventListener("error", function (errorEvent) {
  try {
    if (errorCount < MAX_ERRORS && !isFalsePositive(errorEvent)) {
      var message = errorEvent.message || "";
      var fileName = errorEvent.filename || "";
      var lineNum = errorEvent.lineno || 0;
      var colNum = errorEvent.colno || 0;
      var uniqueKey = JSON.stringify([fileName, lineNum, colNum, message]);
      if (errorCache[uniqueKey] !== uniqueSymbol) {
        errorCount += 1;
        errorCache[uniqueKey] = uniqueSymbol;
        var httpReq = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");
        httpReq.open("POST", "//localhost:3001/api/graphql"),
          httpReq.setRequestHeader("Content-Type", "application/json"),
          httpReq.send(
            '{"query":"mutation{createError(data:{message:' +
              escapeString(message) +
              ",stack:" +
              escapeString(
                ((errorEvent.error && errorEvent.error.stack) || "")
                  .split("\\n")
                  .slice(0, 3)
                  .join("\\n")
              ) +
              ",userAgent:" +
              escapeString(navigator.userAgent || "") +
              ",fileName:" +
              escapeString(fileName) +
              ",lineNum:" +
              lineNum +
              ",colNum:" +
              colNum +
              '}){id}}","variables":{}}'
          );
      }
    }
  } catch {
    //
  }
});
