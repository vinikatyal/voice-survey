module.exports = {
  images: {
    domains: ["gnanispeechprod.blob.core.windows.net"],
  },
  serverRuntimeConfig: {
    secret: "ABCD",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://172.16.22.5:8086" // development api
        : "http://172.16.22.5:8086", // production api

    server: {
      DEV_URL: "http://172.16.22.5:3000",
    },
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
};
