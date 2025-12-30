'use client'
import { CartResponse } from "@/interfaces";
import { createContext, ReactNode, useEffect, useState } from "react";

export const CartContext = createContext<{
    cartData: CartResponse | null,
    setCartData: (value: CartResponse | null) => void,
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    getCart: () => void,
    ownerId: string | null,
    setOwnerId: (value: string | null) => void
}>({
    cartData: null,
    setCartData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getCart: () => { },
    ownerId: null,
    setOwnerId: () => { }
})

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartData, setCartData] = useState<CartResponse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [ownerId, setOwnerId] = useState<string | null>(null)

    async function getCart() {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/api/get-cart')
        const data: CartResponse = await response.json()
        setCartData(data)
        const owner = data?.data?.cartOwner || data?.data.cartOwner || null;
        setOwnerId(owner);
        setOwnerId(data?.data?.cartOwner);
        setIsLoading(false)
    }
    useEffect(() => {
        getCart();
    }, []);

    return <CartContext.Provider value={{ cartData, setCartData, isLoading, setIsLoading, getCart, ownerId, setOwnerId }}>
        {children}
    </CartContext.Provider>

}