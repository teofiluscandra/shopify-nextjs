import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white border-b">
      <div className="flex items-center justify-between max-w-6xl py-4 mx-auto">
        <Link href="/" passHref>
          <a className="font-semibold">NextJS Shopify</a>
        </Link>
        <div>
          <Link href="/cart" passHref>
            <a className="relative font-semibold" aria-label="cart">
              Cart
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
}
