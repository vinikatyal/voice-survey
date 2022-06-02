module.exports = {
  images: {
    domains: ["gnanispeechprod.blob.core.windows.net"],
  },
  serverRuntimeConfig: {
    secret: "ABCD",
    server: {
      DEV_URL: "https://surveycallback.gnani.site",
    },
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "https://surveycallback.gnani.site" // development api
        : "https://surveycallback.gnani.site", // production api

    server: {
      DEV_URL: "https://surveyv2.gnani.site",
      SHARE_URL: "https://app.getvoiceit.com"
    },
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};
