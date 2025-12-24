import { ArrowLink, ProductCard } from "@/components/common";
import { IProduct } from "@/types";

type Props = {
  data: IProduct[];
};

const RelatedProducts = ({ data }: Props) => {
  return (
    <div>
      <div className="flex justify-between my-12 items-center">
        <h2 className="text-text text-xl md:text-4xl font-bold">
          You might also like
        </h2>
        <ArrowLink href="/shop">More Products</ArrowLink>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-11">
        {/* <Swiper
          modules={[Scrollbar, A11y]}
          spaceBetween={24}
          slidesPerView={"auto"}
          // centeredSlides={true}
          scrollbar={{ draggable: true }}
          className="[&_.swiper-slide]:w-[252px]"
        >
          {data.map((product) => (
            <SwiperSlide key={product._id} className="mb-12">
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </Swiper> */}
        {data.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
