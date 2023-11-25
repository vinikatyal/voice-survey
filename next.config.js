module.exports = {
  images: {
    domains: ["gnanispeechprod.blob.core.windows.net"],
  },
  serverRuntimeConfig: {
    secret: "ABCD",
    server: {
      DEV_URL: "https://vercel.site",
    },
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "https://vercel.site" // development api
        : "https://vercel.site", // production api

    server: {
      DEV_URL: "https://vercel.site",
      SHARE_URL: "https://vercel.site",
    },
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};
