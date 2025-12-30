"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/context/cartContext";
import Loading from "@/app/loading";
import { CartResponse } from "@/interfaces";
import toast from "react-hot-toast";
import Link from "next/link";
import Checkout from "@/components/ceckout/page";
import { getUserToken } from "@/Helpers/getUserToken";



export default function Cart() {
  const { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  useEffect(() => {
    if (!cartData || typeof cartData?.data?.products?.[0]?.product === "string") {
      getCart();
    }
  }, [cartData, getCart]);
  const [removingId, setRemovingId] = useState<null | string>(null)
  const [updatingId, setUpdatingId] = useState<null | string>(null)
  const [clearing, setClearing] = useState(false)


  //Delete
  async function removeCartItem(productId: string) {
    setRemovingId(productId)
    const token = await getUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      method: 'DELETE',
      headers: {
        token: token!
      }
    })
    const data: CartResponse = await response.json()
    if (data.status == 'success') {
      setCartData(data)
      toast.success('product deleted successefuly')
    }
    setRemovingId(null)
  }

  //update
  async function updateCartItem(productId: string, count: number) {
    setUpdatingId(productId)
    const token = await getUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      method: 'PUT',
      body: JSON.stringify({ count }),
      headers: {
        token: token!,
        'content-type': 'application/json'
      }
    })
    const data: CartResponse = await response.json()
    console.log(data);
    if (data.status == 'success') {
      setCartData(data)
      toast.success('product updating successefuly')
    }
    setUpdatingId(null)
  }



  // clear cart
  async function clearCart() {
    setClearing(true)
    const token = await getUserToken()
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
      method: 'DELETE',
      headers: {
        token: token!
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzNjNTkyNmZlYWZjMDAzZDQ4N2FjNCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0MzMzNzE4LCJleHAiOjE3NzIxMDk3MTh9.P9fsHDK95ExmaE0bs4dMqpif5yRwY-gqkSI0bhi1NIw',
      }
    })
    const data: CartResponse = await response.json()
    console.log(data);
    if (data.message == 'success') {
      setCartData(null)
      toast.success('products clearing successefuly')
    }
    setClearing(false)
  }




  return (
    <>
      {isLoading || typeof cartData?.data.products[0]?.product == 'string' ? <Loading /> : cartData?.numOfCartItems! > 0 ?
        <div className="container mx-auto py-10">
          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-sm text-gray-500 mb-6">{cartData?.numOfCartItems} items in your cart </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ----------------- PRODUCTS LIST ----------------- */}
            <div className="col-span-2 space-y-4 ">
              {cartData?.data.products.map((item) => (
                <div key={item._id}
                  className="flex items-center justify-between p-4 rounded-xl border shadow-sm">
                  <div className="flex items-center gap-4">

                    <Image src={item.product.imageCover} alt={item.product.title} width={100} height={90} className="rounded-lg object-cover" />

                    <div className="space-y-1">
                      <h2 className="font-semibold">{item.product.title}</h2>
                      <p className="text-sm text-gray-500">
                        {item.product.brand.name}.{item.product.category.name}
                      </p>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" disabled={item.count == 1} className="px-3 cursor-pointer" onClick={() => updateCartItem(item.product.id, item.count - 1)}>
                          -
                        </Button>
                        <span className="px-2">{updatingId == item.product.id ? <Loader className="animate-spin" /> : item.count}</span>
                        <Button variant="outline" className="px-3 cursor-pointer" onClick={() => updateCartItem(item.product.id, item.count + 1)}>
                          +
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="text-right">
                    <p className="font-semibold mb-1">{item.price} EGP</p>
                    <button className="text-red-500 text-sm hover:underline cursor-pointer" onClick={() => removeCartItem(item.product.id)}>
                      {removingId == item.product._id ? <Loader className="animate-spin pt-" /> : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ----------------- SUMMARY ----------------- */}
            <div className="lg:col-span-1 h-fit sticky top-20">
              <div className="border shadow-sm rounded-xl p-5 h-fit">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="flex justify-between text-sm mb-2">
                  <span>Subtotal : {cartData?.numOfCartItems} items</span>
                  <span className="font-medium">
                    {cartData?.data.totalCartPrice} EGP
                  </span>
                </div>

                <div className="flex justify-between text-sm mb-4">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between font-semibold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>{cartData?.data.totalCartPrice} EGP</span>
                </div>
                <Checkout cartId={cartData?.cartId!} />
                <Link href={'/products'}>
                  <Button variant="outline" className="w-full mt-3 bg-black text-white cursor-pointer" >Continue Shopping </Button>
                </Link>
              </div>

              {/* Clear Cart */}
              <div className="mt-6 flex justify-between items-center">
                <Link href={'/yourorders'}><Button className="cursor-pointer">Show your orders</Button></Link>
                <Button variant="destructive" className="cursor-pointer" onClick={clearCart}> <Trash2 className="mr-1" /> {clearing && <Loader />} Clear Cart</Button>
              </div>
            </div>

          </div>
        </div> :
        <div className="flex justify-center items-center min-h-[75vh] flex-col gap-2">
          <h1>Cart is empty...😅</h1>
          <Link href={'/products'}>
            <Button className="cursor-pointer">Go to products</Button>
          </Link>
        </div>
      }
    </>
  );
}