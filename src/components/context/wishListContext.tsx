"use client";
import { WishListResponse } from "@/interfaces/wishlist";
import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserToken } from "@/Helpers/getUserToken";

export const WishlistContext = createContext<{
    wishlistData: WishListResponse | null;
    setWishlistData: (value: WishListResponse | null) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    getWishlist: () => void;
}>({
    wishlistData: null,
    setWishlistData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getWishlist: () => { }
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
    const [wishlistData, setWishlistData] = useState<WishListResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function getWishlist() {
        setIsLoading(true);
        try {
            const token = await getUserToken();
            const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: token! }
            });
            const data: WishListResponse = await response.json();
            setWishlistData(data);
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            setWishlistData(null);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getWishlist();
    }, []);

    return (
        <WishlistContext.Provider value={{ wishlistData, setWishlistData, isLoading, setIsLoading, getWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}
