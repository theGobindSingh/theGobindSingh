interface CookieOptions {
  days?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
}

const setClientCookie = (
  name: string,
  value: string,
  options: CookieOptions = {},
) => {
  const { days, path = "/", domain, secure, sameSite } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (days !== undefined) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 864e5);
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (path) cookieString += `; path=${path}`;
  if (domain) cookieString += `; domain=${domain}`;
  if (secure) cookieString += "; secure";
  if (sameSite) cookieString += `; samesite=${sameSite}`;

  document.cookie = cookieString;
};

const getClientCookie = (name: string): string | undefined => {
  const encodedName = encodeURIComponent(name) + "=";

  const found = document.cookie.split("; ").find((cookie) => {
    return cookie.startsWith(encodedName);
  });

  return found
    ? decodeURIComponent(found.slice(encodedName.length))
    : undefined;
};

const removeClientCookie = (
  name: string,
  options: Pick<CookieOptions, "path" | "domain"> = {},
) => {
  setClientCookie(name, "", {
    ...options,
    days: -1,
  });
};

const hasClientCookie = (name: string): boolean => {
  return getClientCookie(name) !== undefined;
};

const getAllClientCookies = (): Record<string, string> => {
  return document.cookie
    .split("; ")
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, cookie) => {
      const index = cookie.indexOf("=");

      const key = decodeURIComponent(cookie.slice(0, index));
      const value = decodeURIComponent(cookie.slice(index + 1));

      acc[key] = value;
      return acc;
    }, {});
};

export const clientCookies = {
  set: setClientCookie,
  get: getClientCookie,
  remove: removeClientCookie,
  has: hasClientCookie,
  getAll: getAllClientCookies,
};
