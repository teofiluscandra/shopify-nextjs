import { getProductsInCollection } from "@/lib/shopify";
import ProductList from "components/ProductList";
import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProductsInCollection();
  return {
    props: {
      products,
    },
  };
};

const Home: NextPage = ({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProductList products={products} />;
};

export default Home;
