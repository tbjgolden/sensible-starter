// Converts lovely British words into ugly American CSS words:
// 'color', 'behavior', 'colors', 'math', 'miterlimit', 'center', 'capitalize', 'grayscale'

const replacers = {
  color: /colour/gi,
  behavior: /behaviour/gi,
  math: /maths/gi,
  miterlimit: /mitrelimit/gi,
  center: /centre/gi,
  capitalize: /capitalise/gi,
  gray: /grey/gi,
};

module.exports = () => ({
  postcssPlugin: "postcss-uk",
  Declaration(decl) {
    for (const [us, ukRegex] of Object.entries(replacers)) {
      decl.prop = decl.prop.replace(ukRegex, us);
    }
    if (decl.prop === "font-weight" && decl.value === "plump") {
      decl.value = "bold";
    } else if (decl.prop === "transparency") {
      decl.prop = "opacity";

      if (
        Number(decl.value) == decl.value &&
        parseFloat(decl.value) <= 1 &&
        parseFloat(decl.value) >= 0
      ) {
        decl.value = (1 - parseFloat(decl.value)).toFixed(
          (Number(decl.value) + "").replace(".", "").length - 1
        );
      }
    } else if (decl.prop === "text-transform" && decl.value === "capitalise") {
      decl.value = "capitalize";
    } else if (decl.prop === "storey") {
      decl.prop = "z-index";

      if (decl.value === "ground") {
        decl.value = "1";
      } else {
        decl.value = Number(decl.value) + 1 + "";
      }
    }

    // !please instead of !important, it's good to have manners
    if (decl.value.endsWith("!please")) {
      decl.value = decl.value.substring(0, decl.value.length - 7).trim();
      decl.important = true;
    }

    if (decl.prop !== "content") {
      for (const [us, ukRegex] of Object.entries(replacers)) {
        decl.value = decl.value.replace(ukRegex, us);
      }
    }

    decl.value = decl.value.replace(/(var\(--[^\)]*)colour([^\)]*\))/g, "$1color$2");
  },
  AtRule(atRule) {
    // replace @medium with @media
    if (atRule.name === "medium") {
      atRule.name = "media";
    }
  },
});

module.exports.postcss = true;
