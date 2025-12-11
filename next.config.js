module.exports = {
  images: {
    domains: ["your-image-domain.com"], // Add actual domains
  },
  serverRuntimeConfig: {
    secret: process.env.SECRET || "defaultSecret", // Use environment variable
    server: {
      DEV_URL: process.env.DEV_URL || "https://dev.yourdomain.com",
    },
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.API_URL ||
      (process.env.NODE_ENV === "development"
        ? "https://dev-api.yourdomain.com"
        : "https://api.yourdomain.com"),
    server: {
      DEV_URL: process.env.DEV_URL || "https://dev.yourdomain.com",
      SHARE_URL: process.env.SHARE_URL || "https://share.yourdomain.com",
    },
  },
  reactStrictMode: true
};
