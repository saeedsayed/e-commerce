import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductAction from "@/components/shopPageComponents/product details/ProductAction";
import ProductImagesSlide from "@/components/shopPageComponents/product details/ProductImagesSlide";
import RelatedProducts from "@/components/shopPageComponents/product details/RelatedProducts";
import { axiosInstance } from "@/lib/axios";
import { discountCalc } from "@/lib/discountCalc";
import { IProduct, IReviews } from "@/types";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import VersionsOfProduct from "@/components/shopPageComponents/product details/VersionsOfProduct";
import Reviews from "@/components/shopPageComponents/product details/Reviews";
import RatingStars from "@/components/common/RatingStars";

type Props = {
  params: {
    slug: string;
  };
};

const page = async ({ params }: Props) => {
  const { slug: productId } = await params;
  const {
    data: { data: product },
  } = await axiosInstance<{ data: IProduct }>(`products/${productId}`);
  const {
    data: { data: relatedProducts },
  } = await axiosInstance<{ data: IProduct[] }>(
    `products?category=${product.category[0]}&limit=6`,
  );
  const {
    data: { data: reviews },
  } = await axiosInstance<{ data: IReviews[] }>(`review/${productId}`);
  const paths = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    {
      name: product?.category[0] as string,
      path: `/shop?category=${product.category[0]}`,
    },
    { name: product?.title, path: `/shop/${productId}` },
  ];

  const isNew =
    new Date(product.createdAt) >=
    new Date(new Date().setDate(new Date().getDate() - 14));
  return (
    <div className="container">
      {/* breadcrumb */}
      <Breadcrumbs paths={paths} />
      <div className="flex gap-16 flex-col md:flex-row pb-6">
        <div className="w-full md:w-1/2 lg:w-2/5">
          {/* images review */}
          <ProductImagesSlide
            discountPercentage={
              discountCalc(product.price, product.discount).discountPercentage
            }
            images={[product.thumbnail, ...product.images]}
            isNew={isNew}
          />
        </div>
        <div className="flex-1">
          <div className="flex gap-[10px] items-center">
            <RatingStars rating={product?.rating || 0} />

            <p className="text-xs">{product?.reviewsCount} Reviews</p>
          </div>
          {/* title */}
          <h1 className="text-4xl my-4 font-bold">{product.title}</h1>
          {/* description */}
          <p className="text-sub-text">{product.description}</p>
          {/* price */}
          <p className="text-3xl font-bold my-6">
            $
            {product?.discount ? (
              <>
                {discountCalc(product.price, product.discount).newPrice}
                <span className="text-lg line-through ms-3 text-sub-text">
                  ${product.price}
                </span>
              </>
            ) : (
              product.price
            )}
          </p>
          <div className="h-[1px] w-full bg-[#E8ECEF]" />
          {/* colors */}
          {product?.versions.length > 0 && (
            <VersionsOfProduct versions={product?.versions} />
          )}
          {/* action form */}
          <ProductAction id={product._id} stock={product?.stock} />
          <div className="h-[1px] w-full bg-[#E8ECEF]" />
          <div className="flex flex-col gap-2 py-6">
            {/* SKU */}
            <div className="flex gap-9">
              <p className="text-sm text-sub-text w-16">SKU</p>
              <p>{product?.stock}</p>
            </div>
            {/* categories */}
            <div className="flex gap-9">
              <p className="text-sm text-sub-text w-16">category</p>
              <p>
                {product.category.map((item, index) => (
                  <Link href={`/shop?category=${item}`} key={item}>
                    {item} {index !== product.category.length - 1 ? ", " : ""}
                  </Link>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Reviews productId={productId} ratingAVG={product?.rating || 0} reviews={reviews} />
      {/* related products section */}
      <RelatedProducts data={relatedProducts} />
    </div>
  );
};

export default page;
