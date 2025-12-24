import {
  PagesTitle,
  WishlistTable,
  SmallDevicesWishlistTable,
} from "@/components/profilePageComponents";
const Wishlist = async () => {
  return (
    <div>
      <PagesTitle>your Wishlist</PagesTitle>
      <WishlistTable />
      <SmallDevicesWishlistTable />
    </div>
  );
};

export default Wishlist;
