import CartContext from "@/context/cartContext";
import { createCheckout, updateCheckout } from "@/lib/shopify";
import React, { useEffect, useState } from "react";
import { Product } from "../shared/types";

const GlobalState = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [checkoutId, setCheckoutId] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    if (localStorage.checkout_id) {
      const cartObj = JSON.parse(localStorage.checkout_id);
      setCart(cartObj.cart);
      setCheckoutId(cartObj.checkout.id);
      setCheckoutUrl(cartObj.checkout.webUrl);
    }
  }, []);

  const addProductToCart = async (product: Product) => {
    if (cart.length <= 0) {
      setCart([product]);
      const checkout = await createCheckout(
        product.id,
        product.variantQuantity,
      );
      setCheckoutId(checkout.id);
      setCheckoutUrl(checkout.webUrl);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify({ cart: [product], checkout }),
      );
    } else {
      const updatedCart = [...cart];
      const updatedItemIndex = updatedCart.findIndex(
        (item) => item.id === product.id,
      );

      if (updatedItemIndex < 0) {
        updatedCart.push(product);
      } else {
        const updatedItem = {
          ...updatedCart[updatedItemIndex],
        };
        updatedItem.variantQuantity++;
        updatedCart[updatedItemIndex] = updatedItem;
      }

      setCart(updatedCart);
      const updateCheckoutItem = await updateCheckout(checkoutId, updatedCart);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify({ cart: updatedCart, checkout: updateCheckoutItem }),
      );
    }
  };

  const removeProductFromCart = async (productId: string) => {
    const updatedCart = [...cart];
    const updatedItem = updatedCart.filter((item) => item.id != productId);
    setCart(updatedItem);
    const updateCheckoutItem = await updateCheckout(checkoutId, updatedItem);
    localStorage.setItem(
      "checkout_id",
      JSON.stringify({ cart: updatedCart, checkout: updateCheckoutItem }),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductFromCart,
        checkoutUrl,
        cartOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default GlobalState;
