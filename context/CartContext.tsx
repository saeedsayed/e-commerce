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
import {
  Attributes as shippingMethod,
  ShippingMethods,
} from "@/types/shippingMethods";
import { useRouter } from "next/navigation";
import { useAuthContext } from "./AuthContext";
import { axiosInstance } from "@/lib/axios";

// types
interface ICartContext {
  cart: ProductElement[];
  cartStatus: "loading" | "done" | "empty" | "updating";
  addToCart: (
    productId: string,
    quantity: number
    // color: string
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  shippingMethods: ShippingMethods[];
  selectedShippingMethod: shippingMethod;
  setSelectedShippingMethod: (method: shippingMethod) => void;
  totalCartPrice: { subTotal: number; total: number } | undefined;
}

// create context
const CartContext = createContext<ICartContext>({
  cart: [],
  cartStatus: "loading",
  addToCart: async () => {},
  removeFromCart: async () => {},
  shippingMethods: [],
  selectedShippingMethod: {
    methodName: "Free shipping",
    increases: 0,
    typeIncrease: "increases",
  },
  setSelectedShippingMethod: () => {},
  totalCartPrice: { subTotal: 0, total: 0 },
});

// component
const CartProvider = ({ children }: { readonly children: ReactNode }) => {
  // states
  const [cart, setCart] = useState<ProductElement[]>([]);
  const [cartStatus, setCartStatus] = useState<
    "loading" | "done" | "empty" | "updating"
  >("loading");
  const [shippingMethods, setShippingMethods] = useState<ShippingMethods[]>([]);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<shippingMethod>({
      methodName: "Free shipping",
      increases: 0,
      typeIncrease: "increases",
    });
  const [totalCartPrice, setTotalCartPrice] = useState<{
    subTotal: number;
    total: number;
  }>();
  // get session client side
  const { user, status } = useAuthContext();
  const router = useRouter();

  // add to cart function
  const addToCart = async (
    productId: string,
    quantity: number
    // color: string
  ) => {
    if (status === "unauthenticated") {
      toast.error("Please login first");
      router.push("/login");
      return;
    }
    if (cartStatus === "loading" || cartStatus === "updating") {
      toast.error("Please wait...");
      return;
    }
    setCartStatus("updating");
    const { data: newCartData } = await axiosInstance.post<{
      data: ICart;
      message: string;
    }>("/cart", {
      productId,
      quantity,
    });
    //
    setCartStatus("done");
    setTotalCartPrice({
      subTotal: newCartData.data.totalPrice,
      total: newCartData.data.totalPrice,
    });
    setCart(newCartData.data.products);
    toast.success(newCartData.message);
  };

  // remove from cart function
  const removeFromCart = async (productId: string) => {
    if (cartStatus === "loading" || cartStatus === "updating") {
      toast.error("Please wait...");
      return;
    }
    setCartStatus("updating");
    const { data: newCartData } = await axiosInstance.delete<{
      data: ICart;
      message: string;
    }>("/cart", {
      data: { productId },
    });
    setCartStatus(newCartData.data.products.length > 0 ? "done" : "empty");
    setCart(newCartData.data.products);
  };
  // make cart empty
  // const makeCartEmpty = async () => {
  //   const { newCartData, newCartStatus } = await emptyTheCart(
  //     user?.cart as string
  //   );
  //   setCart(newCartData);
  //   setCartStatus(newCartStatus);
  // };

  // get cart
  useEffect(() => {
    if (status === "authenticated") {
      (async () => {
        // get cart from api first time when user is authenticated
        setCartStatus("loading");
        const { data: cartData } = await axiosInstance<{ data: ICart }>(
          "/cart"
        );
        // setShippingMethods(shippingMethods);
        // setSelectedShippingMethod(shippingMethods[0].attributes);
        setCart(cartData?.data?.products);
        setCartStatus(cartData?.data?.products?.length > 0 ? "done" : "empty");
        setTotalCartPrice({
          subTotal: cartData.data.totalPrice,
          total: cartData.data.totalPrice,
        });
      })();
    } else if (status === "unauthenticated") {
      setCart([]);
      setCartStatus("empty");
      setShippingMethods([]);
      setSelectedShippingMethod({
        methodName: "Free shipping",
        increases: 0,
        typeIncrease: "increases",
      });
      setTotalCartPrice({ subTotal: 0, total: 0 });
      return;
    }
  }, [status]);

  useEffect(() => {
    if (cartStatus === "updating" || cartStatus === "loading") {
      document.body.style = "cursor: wait;";
    } else {
      document.body.style = "cursor: default;";
    }
  }, [cartStatus]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartStatus,
        addToCart,
        removeFromCart,
        // makeCartEmpty,
        shippingMethods,
        selectedShippingMethod,
        setSelectedShippingMethod,
        totalCartPrice,
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
