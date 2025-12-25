"use client";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { IProduct } from "@/types";
import { useAuthContext } from "./AuthContext";

// types
interface IWishlistContext {
  wishlist: IProduct[];
  isLoadingWishlist: boolean;
  handleWishlist: (productId: string) => void;
}

// create context
const WishlistContext = createContext<IWishlistContext>({
  wishlist: [],
  isLoadingWishlist: false,
  handleWishlist: () => {},
});

const WishlistProvider = ({ children }: { readonly children: ReactNode }) => {
  const {status}=useAuthContext()
  // fetch wishlist data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      if(status!=="authenticated") return []
      const { data } = await axiosInstance<{ data:{products: IProduct[]} }>("wishlist");
      return data.data.products;
    },
  });
  //   add to wishlist
  const { isPending: handling, mutate: handleWishlist } = useMutation({
    mutationFn: async (productId: string) => {
      if (handling) throw new Error("Already handling request");
      if (data?.find((item) => item._id === productId)) {
        const { data } = await axiosInstance.delete<{ message: string }>(
          `wishlist`,
          { data: { productId } }
        );
        return data;
      } else {
        const { data } = await axiosInstance.post<{ message: string }>(
          `wishlist`,
          { productId }
        );
        return data;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      refetch();
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    },
  });
  useEffect(()=>{
    if(status==="authenticated"){
      refetch()
    }},[status])
  return (
    <WishlistContext.Provider
      value={{
        wishlist: data as IProduct[],
        isLoadingWishlist: isLoading || handling,
        handleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;

// custom hook to use context
export const useWishlistContext = () => {
  return useContext(WishlistContext);
};
