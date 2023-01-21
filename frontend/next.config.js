/** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
// };

// module.exports = withPWA(nextConfig);

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
});
