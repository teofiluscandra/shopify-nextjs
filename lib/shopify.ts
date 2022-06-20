const DOMAIN = process.env.SHOPIFY_DOMAIN;
const API_KEY = process.env.SHOPIFY_STOREFRONT_API;

async function request(query: string) {
  const URL = `https://${DOMAIN}/api/2022-04/graphql.json`;

  const headers: HeadersInit = new Headers();
  headers.set("X-Shopify-Storefront-Access-Token", API_KEY!);
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  const options = {
    endpoint: URL,
    method: "POST",
    headers,
    body: JSON.stringify({ query })
  }

  try {
    const data = await fetch(URL, options).then(res => res.json())
    return data;
  } catch(e) {
    throw new Error('Shopify data not fetched')
  }
}


export async function getProductsInCollection() {
  const query = `
  {
    collectionByHandle(handle: "frontpage") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  id
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
  `

  const response = await request(query);

  const allProducts = response.data.collectionByHandle.products.edges ?? []
  return allProducts;
}

export async function getAllProducts() {
  const query = `
    {
      products(first: 250) {
        edges {
          node {
            handle
            id
          }
        }
      }
    }
  `

  const response = await request(query);
  const slugs = response.data.products.edges ?? [];
  return slugs;
}

export async function getProductsByHandle(handle) {
  const query = `
  {
    productByHandle(handle: "${handle}") {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            priceV2 {
              amount
            }
          }
        }
      }
    }
  }
  `

  const response = await request(query);
  const product = response.data.productByHandle;
  return product;

}

export async function createCheckout(id, qty) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${qty} }]
      }) {
        checkout {
          id,
          webUrl,
          orderStatusUrl
        }
      }
    }
  `;

  const response = await request(query);
  const checkout = response.data.checkoutCreate.checkout ?? [];
  return checkout;
}
