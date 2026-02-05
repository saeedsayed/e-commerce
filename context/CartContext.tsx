"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { ICartItem } from "@/types/cart.type";
import { useAuthContext } from "./AuthContext";
import { axiosInstance } from "@/lib/axios";
import {
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { ICoupon, IShippingMethod } from "@/types";

// types
interface ICartContext {
  cart: ICartItem[];
  cartIsLoading: boolean;
  cartIsUpdating: boolean;
  shippingMethodsLoading: boolean;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  shippingMethods: IShippingMethod[];
  selectedShippingMethod: IShippingMethod;
  setSelectedShippingMethod: (method: IShippingMethod) => void;
  totalCartPrice: { subTotal: number; total: number };
  applyCoupon: UseMutateFunction<{ data: ICoupon }, any, string, unknown>;
  removeCoupon: () => void;
  applyingCoupon: boolean;
  coupon: ICoupon | null;
  couponError: Error | null;
}

// create context
const CartContext = createContext<ICartContext>({
  cart: [],
  cartIsLoading: true,
  cartIsUpdating: false,
  shippingMethodsLoading: true,
  addToCart: async () => {},
  removeFromCart: async () => {},
  shippingMethods: [],
  selectedShippingMethod: {} as IShippingMethod,
  setSelectedShippingMethod: () => {},
  totalCartPrice: { subTotal: 0, total: 0 },
  applyCoupon: () => {},
  removeCoupon: () => {},
  applyingCoupon: false,
  coupon: null,
  couponError: null,
});

const calculateCartAmount = (
  coupon: ICoupon,
  productsAmount: number,
  shippingMethod: IShippingMethod
) => {
  const subTotal = productsAmount;
  const total:number = +(subTotal - (coupon?.discount || 0) + shippingMethod.cost).toFixed(2);
  return { subTotal, total };
};

// component
const CartProvider = ({ children }: { readonly children: ReactNode }) => {
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<IShippingMethod>({} as IShippingMethod);
  const [coupon, setCoupon] = useState<ICoupon | null>();
  const { status } = useAuthContext();
  // fetch cart data
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (status !== "authenticated") return [];
      const { data } = await axiosInstance<{
        data: { products: ICartItem[]; totalPrice: number };
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
  const handleSelectedShippingMethod = (method: IShippingMethod) => {
    setSelectedShippingMethod(method);
    localStorage.setItem("shipping_method", method.name);
  };
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

  const removeFromCart = async (productId: string) => {
    return handleCart({ productId, quantity: 0 });
  };
  const addToCart = async (productId: string, quantity: number) => {
    return handleCart({ productId, quantity });
  };
  // apply coupon

  const {
    isPending: applyingCoupon,
    error: couponError,
    mutate: applyCoupon,
  } = useMutation({
    mutationFn: async (code: string) => {
      if (!code.length) return { data: {} as ICoupon };
      try {
        const { data } = await axiosInstance<{ data: ICoupon }>(
          `coupon/${code}`
        );
        return data;
      } catch (err: any) {
        throw new Error(err.response.data.message);
      }
    },
    onSuccess: ({ data: coupon }) => {
      setCoupon(coupon);
    },
    onError: (err: any) => {
      toast.error(err?.message);
      return err?.message;
    },
  });

  const removeCoupon = () => setCoupon(null);

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
          : []) as ICartItem[],
        cartIsLoading: isLoading || status === "loading",
        shippingMethodsLoading,
        cartIsUpdating: handling,
        addToCart,
        removeFromCart,
        // makeCartEmpty,
        shippingMethods: shippingMethods || [],
        selectedShippingMethod,
        setSelectedShippingMethod: handleSelectedShippingMethod,
        totalCartPrice:
          data && typeof data === "object" && "totalPrice" in data
            ? calculateCartAmount(
                coupon as ICoupon,
                data.totalPrice,
                selectedShippingMethod
              )
            : { total: 0, subTotal: 0 },
        applyCoupon,
        removeCoupon,
        applyingCoupon,
        coupon: coupon as ICoupon,
        couponError,
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
