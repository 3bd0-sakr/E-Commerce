"use client";
import OrderItemsDropdown from "@/components/dropItem/page";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function AllOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    async function getAllOrders() {
        try {
            const res = await fetch('https://ecommerce.routemisr.com/api/v1/orders/');
            const data = await res.json();
            setOrders(Array.isArray(data.data) ? data.data : []);
        } catch (e) {
            console.error(e);
            setOrders([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        getAllOrders();
    }, []);

    if (loading) return <p className="flex justify-center items-center h-screen"><Loader className="animate-spin text-9xl min-h-[75vh]" /></p>;

    return (
        <div>
            <h1 className="text-3xl font-bold py-1.5">All Orders</h1>

            {orders.length === 0 && <p>No Orders Found</p>}

            {orders.map(order => (
                <div key={order._id} className="shadow rounded-2xl my-4 p-6">
                    <h2>Order # {order._id}</h2>
                    <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>
                        Payment: {order.paymentMethodType}
                        {order.isPaid && <span className="text-green-300"> (Paid)</span>}
                    </p>
                    <p>Delivered: {order.isDelivered ? "Yes" : "No"}</p>
                    <p>Total: {order.totalOrderPrice} EGP</p>
                    <div className="mt-2">
                        <h3>Shipping Address</h3>
                        <p>City: {order.shippingAddress?.city || "N/A"}</p>
                        <p>Phone: {order.shippingAddress?.phone || "N/A"}</p>
                        <OrderItemsDropdown order={order.cartItems} />

                    </div>
                </div>
            ))}
        </div>
    );
}
