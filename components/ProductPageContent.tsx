import ProductForm from "@/components/ProductForm";
import Image from "next/image";
import { CSSProperties } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Product } from "__generated__/graphql";

export default function ProductPageContent({ product }: { product: Product }) {
  const images = product.images.edges.map((image, i) => {
    return (
      <SwiperSlide key={`slide-${i}`}>
        <Image
          src={image.node.url}
          alt={image.node.altText!}
          layout="fill"
          objectFit="cover"
        />
      </SwiperSlide>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center w-11/12 max-w-6xl mx-auto space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-4 lg:space-x-8">
      <div className="w-full max-w-md rounded shadow-lg md:w-1/2">
        <Swiper
          className="relative w-full h-96 rounded-2xl"
          style={
            {
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#000",
            } as CSSProperties
          }
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {images}
        </Swiper>
      </div>
      <ProductForm product={product} />
    </div>
  );
}
