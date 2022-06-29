import ProductPageContent from "@/components/ProductPageContent";
import { getAllProducts, getProductsByHandle } from "@/lib/shopify";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { ParsedUrlQuery } from "querystring";
import { ProductEdge } from "__generated__/graphql";

interface IParams extends ParsedUrlQuery {
  product: string;
}

const ProductPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="min-h-screen py-12">
      <ProductPageContent product={product} />
    </div>
  );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();

  const paths = products.map((item: ProductEdge) => {
    const product = String(item.node.handle);
    return {
      params: { product },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext,
) => {
  const { product: productName } = context.params as IParams;
  const product = await getProductsByHandle(productName);
  return {
    props: {
      product,
    },
  };
};
