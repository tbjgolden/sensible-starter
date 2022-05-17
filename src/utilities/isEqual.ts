export type TypeOf =
  | "string"
  | "number"
  | "boolean"
  | "function"
  | "bigint"
  | "symbol"
  | "undefined"
  | "null"
  | "Array"
  | "Object";

export const getTypeOf = (value: unknown): TypeOf => {
  const typeOf = typeof value;

  if (typeOf === "object") {
    if (value === null) {
      return "null";
    } else if (Array.isArray(value)) {
      return "Array";
    } else {
      return "Object";
    }
  }

  return typeOf;
};

export const isEqualValue = (a: unknown, b: unknown, maxDepth: number): boolean => {
  const typeOfA = getTypeOf(a);
  const typeOfB = getTypeOf(b);

  if (
    (typeOfA === "bigint" && typeOfB === "number") ||
    (typeOfA === "number" && typeOfB === "bigint")
  ) {
    // == needed to allow this check
    return a == b;
  } else if (typeOfA === "number" && typeOfB === "number") {
    // NaN !== NaN, so check for this manually
    return Number.isNaN(a) && Number.isNaN(b) ? true : a === b;
  } else if (typeOfA !== typeOfB) {
    // Everything else can only ever be equal to a value of the same type
    return false;
  } else {
    const typeOf = typeOfA as Exclude<TypeOf, "number">;
    if (
      typeOf === "string" ||
      typeOf === "boolean" ||
      typeOf === "function" ||
      typeOf === "symbol" ||
      typeOf === "null" ||
      typeOf === "undefined" ||
      typeOf === "bigint"
    ) {
      return a === b;
    } else if (typeOf === "Array") {
      const $a = a as Array<unknown>;
      const $b = b as Array<unknown>;
      // check array length
      if ($a.length !== $b.length) {
        return false;
      }
      if (maxDepth > 0) {
        return $a.every((_, i) => {
          return isEqualValue($a[i], $b[i], maxDepth - 1);
        });
      }
      return true;
    } else {
      const $a = a as Record<string, unknown>;
      const $b = b as Record<string, unknown>;
      // check array length
      const aKeys = new Set(Object.keys($a));
      const bKeys = new Set(Object.keys($b));
      if (aKeys.size !== bKeys.size) {
        return false;
      } else {
        for (const aKey of aKeys) {
          if (!bKeys.has(aKey)) {
            return false;
          }
        }
      }
      if (maxDepth > 0) {
        for (const aKey of aKeys) {
          if (!isEqualValue($a[aKey], $b[aKey], maxDepth - 1)) {
            return false;
          }
        }
      }
      return true;
    }
  }
};
