export interface Variant {
  Size: string,
  Color: string
}

export interface Product {
  handle: string,
  id: string,
  image: string,
  options: Variant[],
  title: string,
  variantPrice: string,
  variantQuantity: number,
  variantTitle: string
}
