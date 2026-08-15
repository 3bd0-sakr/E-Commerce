'use client'

import React, { useContext, useState } from 'react'
import { HeartIcon, Loader, ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { AddToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { AddToWishListAction } from '@/app/(pages)/products/_action/addToWishList.action'
import { CartContext } from '../context/cartContext'
import { WishlistContext } from '../context/wishListContext'
import { Button } from '../ui/button'
import { CardFooter } from '../ui/card'

export default function AddToCart({ productId }: { productId: string }) {
    const { setCartData } = useContext(CartContext)
    const { getWishlist } = useContext(WishlistContext)
    const [loading, setLoading] = useState(false)
    const [wishlistLoading, setWishlistLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    async function addProductToCart() {
        if (session.status !== 'authenticated') {
            router.push('/login')
            return
        }

        setLoading(true)
        const data = await AddToCartAction(productId)
        if (data.status == 'success') toast.success('Product added successfully')
        setCartData(data)
        setLoading(false)
    }

    async function addProductToWishlist() {
        if (session.status !== 'authenticated') {
            router.push('/login')
            return
        }

        setWishlistLoading(true)
        const data = await AddToWishListAction(productId)
        if (data.status === 'success') {
            toast.success('Product added to wishlist')
            getWishlist()
        }
        setWishlistLoading(false)
    }

    return (
        <CardFooter className="flex gap-1.5">
            <Button onClick={addProductToCart} className="grow cursor-pointer">
                {loading ? <Loader className="animate-spin" /> : <ShoppingCart />}
                Add to cart
            </Button>

            <Button variant="outline" size="icon" onClick={addProductToWishlist} className="cursor-pointer">
                {wishlistLoading ? (
                    <Loader className="animate-spin" />
                ) : (
                    <HeartIcon className="text-red-500" />
                )}
            </Button>
        </CardFooter>
    )
}
