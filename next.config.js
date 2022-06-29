/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.shopify.com"],
  },
  env: {
    SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
    SHOPIFY_STOREFRONT_API: process.env.SHOPIFY_STOREFRONT_API,
  },
};
