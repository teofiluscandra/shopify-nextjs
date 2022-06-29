import ProductCard from "@/components/ProductCard";
import type { ProductEdge } from "__generated__/graphql";

const ProductList = ({ products }: { products: ProductEdge[] }) => {
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-6xl">
        <h2 className="mb-6 text-2xl font-extrabold text-gray-900">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product: ProductEdge) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
