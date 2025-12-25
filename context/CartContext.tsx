"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { ICart, ProductElement } from "@/types/cart.type";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthContext";
import { axiosInstance } from "@/lib/axios";
import { IProduct } from "@/types/product.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IShippingMethod } from "@/types";

// types
interface ICartContext {
  cart: ProductElement[];
  cartIsLoading: boolean;
  cartIsUpdating: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  shippingMethods: IShippingMethod[];
  selectedShippingMethod: IShippingMethod;
  setSelectedShippingMethod: (method: IShippingMethod) => void;
  totalCartPrice: number;
}

// create context
const CartContext = createContext<ICartContext>({
  cart: [],
  cartIsLoading: true,
  cartIsUpdating: false,
  addToCart: async () => {},
  removeFromCart: async () => {},
  shippingMethods: [],
  selectedShippingMethod: {} as IShippingMethod,
  setSelectedShippingMethod: () => {},
  totalCartPrice: 0,
});

// component
const CartProvider = ({ children }: { readonly children: ReactNode }) => {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<IShippingMethod>({} as IShippingMethod);
  const { status } = useAuthContext();
  // fetch cart data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (status !== "authenticated") return [];
      const { data } = await axiosInstance<{
        data: { products: ProductElement[]; totalPrice: number };
      }>("cart");
      return data.data;
    },
  });
  // fetch shipping methods data
  const { data: shippingMethods, isLoading: shippingMethodsLoading } = useQuery(
    {
      queryKey: ["shippingMethods"],
      queryFn: async () => {
        const { data } = await axiosInstance<{
          data: IShippingMethod[];
        }>("shipping");
        if (data.data.length > 0 && !localStorage.getItem("shipping_method")) {
          setSelectedShippingMethod(data.data[0]);
        } else if (
          data.data.length > 0 &&
          localStorage.getItem("shipping_method")
        ) {
          const methodName = localStorage.getItem("shipping_method");
          const method = data.data.find((m) => m.name === methodName);
          setSelectedShippingMethod(method as IShippingMethod);
        }
        return data.data;
      },
    }
  );
  //   add to cart
  const { isPending: handling, mutate: handleCart } = useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      if (handling) throw new Error("Already handling request");
      if (quantity <= 0) {
        const { data } = await axiosInstance.delete<{ message: string }>(
          `cart`,
          { data: { productId } }
        );
        return data;
      } else {
        const { data } = await axiosInstance.post<{ message: string }>(`cart`, {
          productId,
          quantity,
        });
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

  useEffect(() => {
    if (status === "authenticated") {
      refetch();
    }
  }, [status]);

  return (
    <CartContext.Provider
      value={{
        cart: (data && typeof data === "object" && "products" in data
          ? data.products
          : []) as ProductElement[],
        cartIsLoading: isLoading,
        cartIsUpdating: handling,
        addToCart: async (productId: string, quantity: number) => {
          return handleCart({ productId, quantity });
        },
        removeFromCart: async (productId: string) => {
          return handleCart({ productId, quantity: 0 });
        },
        // makeCartEmpty,
        shippingMethods: shippingMethods || [],
        selectedShippingMethod,
        setSelectedShippingMethod: (method: IShippingMethod) => {
          setSelectedShippingMethod(method);
          localStorage.setItem("shipping_method", method.name);
        },
        totalCartPrice: (data &&
        typeof data === "object" &&
        "totalPrice" in data
          ? data.totalPrice
          : 0) as number,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

// custom hook to use context
export const useCartContext = () => {
  return useContext(CartContext);
};
