'use client'
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import { HeartIcon, Loader, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '../context/cartContext'
import { AddToCartAction } from '@/app/(pages)/products/_action/addToCart.action'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { WishlistContext } from '../context/wishListContext'
import { AddToWishListAction } from '@/app/(pages)/products/_action/addToWishList.action'

export default function AddToCart({ productId }: { productId: string }) {
    const { getCart, setCartData } = useContext(CartContext)
    const [loading, setLoading] = useState(false)
    const { getWishlist } = useContext(WishlistContext)
    const [wishlistLoading, setWishlistLoading] = useState(false)
    const session = useSession()
    const router = useRouter()

    async function addProductToCart() {
        if (session.status == 'authenticated') {
            setLoading(true)
            const data = await AddToCartAction(productId)
            // const data = await response.json()
            data.status == 'success' && toast.success('product added successfuly')
            setCartData(data)
            setLoading(false)
        } else {
            router.push('/login')
        }
    }

    async function addProductToWishlist() {
        if (session.status === 'authenticated') {
            setWishlistLoading(true)

            const data = await AddToWishListAction(productId)

            if (data.status === 'success') {
                toast.success('product added to wishlist ❤️')
                getWishlist()
            }

            setWishlistLoading(false)
        } else {
            router.push('/login')
        }
    }


    return (
        <CardFooter className="flex gap-1.5">
            <Button onClick={addProductToCart} className="grow cursor-pointer">
                {loading ? <Loader className="animate-spin" /> : <ShoppingCart />}
                Add to cart
            </Button>

            <Button variant="outline" size="icon" onClick={addProductToWishlist} className="cursor-pointer">
                {wishlistLoading ? (
                    <Loader className="animate-spin" />) : (
                    <HeartIcon className="text-red-500" />)}
            </Button>
        </CardFooter>
    )
}
