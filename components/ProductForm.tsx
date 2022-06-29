import ProductOption from "@/components/ProductOption";
import CartContext from "@/context/cartContext";
import { rupiahFormatter } from "@/utils/helpers";
import { useContext, useState } from "react";
import type { Product, ProductVariantEdge } from "__generated__/graphql";

interface ProductVariantV2 extends ProductVariantEdge {
  node: ProductVariantEdge["node"] & {
    priceV2: {
      amount: number;
    };
  };
}

export default function ProductForm({ product }: { product: Product }) {
  const variantsEdges = product.variants.edges as ProductVariantV2[];
  const variants = variantsEdges?.map((variant) => {
    const allOptions = {} as any;

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues = {} as any;

  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  const setOptions = (name: string, value: string) => {
    setSelectedOptions((prevState: any) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    variants.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  };

  const { addProductToCart } = useContext(CartContext);

  const price = product.variants.edges[0] as ProductVariantV2;

  return (
    <div className="flex flex-col w-full p-4 shadow-lg rounded-2xl md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="mb-2">
        {rupiahFormatter.format(price.node.priceV2.amount)}
      </span>
      {product.options.map(({ name, values }) => (
        <ProductOption
          key={`id-${name}`}
          name={name}
          values={values}
          selectedOptions={selectedOptions}
          setOptions={setOptions}
        />
      ))}
      <button
        className="p-2 mt-5 bg-green-800 rounded-lg text-slate-100 hover:bg-green-600"
        aria-label="cart-button"
        onClick={() => addProductToCart(selectedVariant)}
      >
        Add To Cart
      </button>
    </div>
  );
}
