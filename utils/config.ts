export const yellow = "#FAE232";
export const moralisUrl = "https://deep-index.moralis.io/api/v2/";
export const network = "0x61";
export const prefix = "/api/v1/";
export const isDevelopment =
  typeof window !== "undefined" &&
  (window.location.href.includes("localhost") ||
    window.location.href.includes("adev.co"))
    ? true
    : false;
