type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | null | undefined };

const stringify = (value: ClassValue): string => {
  if (!value) return "";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(stringify).join(" ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([, enabled]) => {
        return Boolean(enabled);
      })
      .map(([className]) => {
        return className;
      })
      .join(" ");
  }

  return "";
};

export const tw = (
  strings: TemplateStringsArray,
  ...values: ClassValue[]
): string => {
  return strings
    .reduce((result, str, i) => {
      return result + str + stringify(values[i]);
    }, "")
    .replace(/\s+/g, " ")
    .trim();
};
