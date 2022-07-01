module.exports = {
  images: {
    domains: ["gnanispeechprod.blob.core.windows.net"],
  },
  serverRuntimeConfig: {
    secret: "ABCD",
    server: {
      DEV_URL: "https://surveycallback2.gnani.site",
    },
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "https://surveycallback2.gnani.site" // development api
        : "https://surveycallback2.gnani.site", // production api

    server: {
      DEV_URL: "https://surveyv3.gnani.site",
      SHARE_URL: "https://surveyv3.gnani.site"
    },
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};
