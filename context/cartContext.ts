import { createContext } from 'react';
import { Product } from '../shared/types';

export interface ICartContext {
  cart: Product[]
  checkoutUrl: string
  addProductToCart(product: any): void,
  removeProductFromCart(productId: string): void,
  cartOpen: boolean,
  setCartOpen(cartOpen: boolean): void
}

export default createContext({} as ICartContext)
