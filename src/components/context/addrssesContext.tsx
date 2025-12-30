"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import { getUserToken } from "@/Helpers/getUserToken";
import { AddressI, AddressResponse } from "@/interfaces";

export const AddressContext = createContext<{
    addressData: AddressResponse | null;
    setAddressData: (value: AddressResponse | null) => void;
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
    getAddresses: () => void;
    addAddress: (address: Omit<AddressI, "_id">) => Promise<void>;
    removeAddress: (id: string) => Promise<void>;
}>({
    addressData: null,
    setAddressData: () => { },
    isLoading: false,
    setIsLoading: () => { },
    getAddresses: () => { },
    addAddress: async () => { },
    removeAddress: async () => { }
});

export default function AddressContextProvider({ children }: { children: ReactNode }) {
    const [addressData, setAddressData] = useState<AddressResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    //Get Addresses
    async function getAddresses() {
        setIsLoading(true);
        try {
            const token = await getUserToken();
            const response = await fetch(
                "https://ecommerce.routemisr.com/api/v1/addresses",
                {
                    headers: { token: token! }
                }
            );
            const data: AddressResponse = await response.json();
            setAddressData(data);
        } catch (err) {
            console.error("Error fetching addresses:", err);
            setAddressData(null);
        }
        setIsLoading(false);
    }

    //Add Address
    async function addAddress(address: Omit<AddressI, "_id">) {
        try {
            const token = await getUserToken();
            await fetch(
                "https://ecommerce.routemisr.com/api/v1/addresses",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        token: token!
                    },
                    body: JSON.stringify(address)
                }
            );
            getAddresses();
        } catch (err) {
            console.error("Error adding address:", err);
        }
    }

    //Remove Address
    async function removeAddress(id: string) {
        try {
            const token = await getUserToken();
            await fetch(
                `https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
                {
                    method: "DELETE",
                    headers: { token: token! }
                }
            );
            getAddresses();
        } catch (err) {
            console.error("Error removing address:", err);
        }
    }

    useEffect(() => {
        getAddresses();
    }, []);

    return (
        <AddressContext.Provider
            value={{ addressData, setAddressData, isLoading, setIsLoading, getAddresses, addAddress, removeAddress }}>
            {children}
        </AddressContext.Provider>
    );
}
