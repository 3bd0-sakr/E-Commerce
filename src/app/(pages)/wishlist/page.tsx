"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingCart, Loader } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import Loading from "@/app/loading";
import { WishlistContext } from "@/components/context/wishListContext";
import { CartContext } from "@/components/context/cartContext";
import { getUserToken } from "@/Helpers/getUserToken";
import toast from "react-hot-toast";
import { AddToCartAction } from "@/app/(pages)/products/_action/addToCart.action";

export default function Wishlist() {
    const { wishlistData, isLoading, getWishlist } = useContext(WishlistContext);
    const { setCartData, getCart } = useContext(CartContext);
    const [removingId, setRemovingId] = useState<null | string>(null);
    const [addingToCartId, setAddingToCartId] = useState<null | string>(null);

    // حذف عنصر واحد
    async function removeWishlistItem(productId: string) {
        setRemovingId(productId);
        const token = await getUserToken();
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: "DELETE",
            headers: { token: token! }
        });
        const data = await response.json();
        if (data.status === "success") {
            toast.success("Item removed from wishlist");
            getWishlist();
        } else {
            toast.error("Failed to remove item");
        }
        setRemovingId(null);
    }


    async function addToCart(productId: string) {
        setAddingToCartId(productId);
        const data = await AddToCartAction(productId);
        if (data.status === "success") {
            toast.success("Product added to cart");
            setCartData(data);
            getCart();
        } else {
            toast.error("Failed to add product");
        }
        setAddingToCartId(null);
    }

    if (isLoading) return <Loading />;

    if (!wishlistData || wishlistData.count === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[75vh] gap-3">
                <h1 className="text-xl">Wishlist is empty 💔</h1>
                <Link href="/products">
                    <Button className="cursor-pointer">Go to products</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-2">My Wishlist ❤️</h1>
            <p className="text-sm text-gray-500 mb-6">{wishlistData.count} items in your wishlist</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Products List */}
                <div className="col-span-2 space-y-4">
                    {wishlistData.data.map((item) => (
                        <div key={item._id} className="flex items-center justify-between p-4 rounded-xl border shadow-sm">
                            <div className="flex items-center gap-4">
                                <Image src={item.imageCover} alt={item.title} width={100} height={90} className="rounded-lg object-cover" />
                                <div className="space-y-1">
                                    <h2 className="font-semibold">{item.title}</h2>
                                    <p className="text-sm text-gray-500">{item.brand.name} · {item.category.name}</p>
                                    <Button className="mt-2 gap-1 cursor-pointer" onClick={() => addToCart(item._id)}
                                        disabled={addingToCartId === item._id}>
                                        {addingToCartId === item._id ? <Loader className="animate-spin" /> : <ShoppingCart size={16} />}
                                        Add to Cart
                                    </Button>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold mb-1">{item.price} EGP</p>
                                <button onClick={() => removeWishlistItem(item._id)}
                                    className="text-red-500 text-sm hover:underline cursor-pointer">
                                    {removingId === item._id ? <Loader className="animate-spin" /> : "Remove"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:col-span-1 h-fit sticky top-20">
                    <div className="border shadow-sm rounded-xl p-5">
                        <h2 className="text-xl font-semibold mb-4">Wishlist Summary</h2>
                        <div className="flex justify-between text-sm mb-4">
                            <span>Total items</span>
                            <span className="font-medium">{wishlistData.count}</span>
                        </div>
                        <Link href="/products">
                            <Button className="w-full">Continue Shopping</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
