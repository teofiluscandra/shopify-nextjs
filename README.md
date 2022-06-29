# Next.js + Tailwind CSS + Shopify GraphQL Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with Next.js. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## How to use

### Shopify Setup

You'll need to create a Shopify store and a private app for that Shopify store and add enable Storefront API.

### Code Setup

Copy the `.env.example` file into `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- SHOPIFY_DOMAIN is the domain of the store
- SHOPIFY_STOREFRONT_API is your private app's storefront api token

Then run project locally:

```bash
yarn && yarn dev
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).
