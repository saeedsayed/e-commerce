"use client";
import { getData } from "@/lib/getAPI";
import { useSession } from "next-auth/react";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { toast } from "react-hot-toast";
import { Datum } from "@/types/wishlist";
import { addOrRemoveFromWishlist } from "@/lib/addOrRemoveFromWishlist";
import { useRouter } from "next/navigation";

// types
interface IWishlistContext {
    wishlist: Datum[];
    handleWishlist: (id: string) => void;
    wishlistStatus: "loading" | "done" | "empty";
}

// create context
const WishlistContext = createContext<IWishlistContext>({
    wishlist: [],
    wishlistStatus: "loading",
    handleWishlist: () => { },
});

const WishlistProvider = ({ children }: { readonly children: ReactNode }) => {
    // states
    const [wishlist, setWishlist] = useState<Datum[]>([]);
    const [wishlistStatus, setWishlistStatus] = useState<
        "loading" | "done" | "empty"
    >("loading");
    // get session client side
    const { data: session, status } = useSession();
    const router = useRouter()

    // add or remove from wishlist
    const handleWishlist = async (id: String) => {
        // check if user is logged in
        if (status === "unauthenticated") {
            toast.error("Please login first");
            router.push('/login')
            return;
        }
        if (status === "loading") {
            toast.error("Please wait...");
            return;
        }
        if (wishlistStatus === "loading") {
            toast.error("Please wait...");
            return;
        }
        setWishlistStatus("loading");
        // get wishlist and wishlist status from another async function
        const { newWishlistData, newWishlistStatus } =
            await addOrRemoveFromWishlist(
                session?.user?.wishlistId as number,
                id,
                wishlist
            );
        // update wishlist and wishlist status
        setWishlist(newWishlistData);
        setWishlistStatus(newWishlistStatus);
    };

    // get wishlist first time
    useEffect(() => {
        if (status === "authenticated") {
            (async () => {
                try {
                    // get wishlist from api first time when user is authenticated
                    setWishlistStatus("loading");
                    const [err, data] = await getData(
                        `wishlists/${session?.user?.wishlistId}`,
                        ["products.thumbnail"]
                    );
                    if (err) throw new Error(err);
                    setWishlist(data.attributes.products.data);
                    setWishlistStatus(
                        data.attributes.products.data.length > 0 ? "done" : "empty"
                    );
                } catch (err) {
                    console.log(err);
                }
            })();
        } else if (status === "unauthenticated") {
            setWishlist([]);
            setWishlistStatus("empty");
        }
    }, [status]);

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                wishlistStatus,
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
