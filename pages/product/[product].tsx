import ProductPageContent from "@/components/ProductPageContent";
import { getAllProducts, getProductsByHandle } from "@/lib/shopify";
import { GetStaticPaths, GetStaticProps } from "next";

const ProductPage = ({ product }) => {
  console.log(product);
  return (
    <div className="min-h-screen py-12">
      <ProductPageContent product={product} />
    </div>
  );
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getAllProducts();

  const paths = products.map((item) => {
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product = await getProductsByHandle(params.product);
  return {
    props: {
      product,
    },
  };
};
