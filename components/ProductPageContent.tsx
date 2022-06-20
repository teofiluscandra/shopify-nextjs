import ProductForm from "@/components/ProductForm";
import Image from "next/image";

export default function ProductPageContent({ product }) {
  console.log(product);
  return (
    <div className="flex flex-col items-center justify-center w-11/12 max-w-6xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8">
      <div className="w-full max-w-md rounded shadow-lg md:w-1/2">
        <div className="relative w-full h-96">
          <Image
            src={product.images.edges[0].node.url}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
