import CartSlider from "@/components/CartSlider";
import cartContext from "@/context/cartContext";
import Link from "next/link";
import { useContext } from "react";

export default function Header() {
  const { cart, setCartOpen } = useContext(cartContext);
  const qty = cart.reduce((count, curItem) => {
    return count + curItem.variantQuantity;
  }, 0);

  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between max-w-6xl py-4 mx-auto">
        <Link href="/" passHref>
          <a className="font-semibold">NextJS Shopify</a>
        </Link>

        <a
          className="relative font-semibold cursor-pointer"
          aria-label="cart"
          onClick={() => setCartOpen(true)}
        >
          Cart ( {qty} )
        </a>

        <CartSlider cart={cart} />
      </div>
    </header>
  );
}
