import { getProductsInCollection } from "@/lib/shopify";
import ProductList from "components/ProductList";
import type { NextPage } from "next";

export async function getStaticProps() {
  const products = await getProductsInCollection();
  return {
    props: {
      products,
    },
  };
}

const Home: NextPage = ({ products }) => {
  return <ProductList products={products} />;
};

export default Home;
