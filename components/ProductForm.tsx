import ProductOption from "@/components/ProductOption";
import { rupiahFormatter } from "@/utils/helpers";
import { useState } from "react";

export default function ProductForm({ product }) {
  console.log(product);
  const variants = product.variants.edges?.map((variant) => {
    const allOptions = {};

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

  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  console.log(variants);
  console.log(selectedVariant);
  console.log(selectedOptions);

  const setOptions = (name, value) => {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <div className="flex flex-col w-full p-4 shadow-lg rounded-2xl md:w-1/3">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <span className="pb-6">
        {rupiahFormatter.format(product.variants.edges[0].node.priceV2.amount)}
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
        className="p-2 mt-3 bg-green-800 rounded-lg text-slate-100 hover:bg-green-600"
        aria-label="cart-button"
        onClick={() => {}}
      >
        Add To Cart
      </button>
    </div>
  );
}
