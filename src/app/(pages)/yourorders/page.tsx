"use client";
import { CartContext } from '@/components/context/cartContext'
import OrderItemsDropdown from '@/components/dropItem/page';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'

export default function AllOrders() {
    const { ownerId } = useContext(CartContext)
    const [isorders, setisorders] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)


    async function getorders() {
        if (!ownerId) return
        setIsLoading(true)
        try {
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/' + ownerId)
            const data = await response.json()
            setisorders(Array.isArray(data) ? data : [])
            console.log("ORDERS:", data)
        } catch (error) {
            console.error(error)
            setisorders([])
        }
        setIsLoading(false)
    }

    useEffect(() => {
        const owner = ownerId
        console.log(owner);
        if (ownerId) getorders()
    }, [ownerId])

    return (
        <div>
            <h1 className='text-3xl font-bold py-1.5'>All Orders</h1>

            {isLoading && <p className='min-h-screen flex justify-center items-center text-6xl'><Loader className='animate-spin text-6xl' /> </p>}
            {!isLoading && isorders.length === 0 && <p>No Orders Found</p>}

            {Array.isArray(isorders) && isorders.map((order: any) => (
                <div key={order._id} className='shadow rounded-2xl my-4 p-6'>
                    <h2>Order # {order._id}</h2>
                    <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>
                        Payment: {order.paymentMethodType} {order.isPaid && <span className='text-green-300'>(Paid)</span>}
                    </p>
                    <p>Delivered: {order.isDelivered ? "Yes" : "No"}</p>
                    <p>Total: {order.totalOrderPrice} EGP</p>

                    <div className='mt-2'>
                        <h3>Shipping Address</h3>
                        <p>City: {order.shippingAddress.city}</p>
                        <p>Phone: {order.shippingAddress.phone}</p>
                        <OrderItemsDropdown order={order.cartItems} />
                    </div>
                </div>
            ))}
        </div>
    )
}