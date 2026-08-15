import { ProductI } from '@/interfaces';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import MyStar from '@/components/myStar/page';

import Carusor from '@/components/carusor/page';
import AddToCart from '@/components/addToCart/page';

export const dynamic = 'force-dynamic'

//api
export default async function ProductDetails({ params }: { params: Params }) {
    const { productId } = await params
    // console.log(productId);
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)
    const { data: product }: { data: ProductI } = await response.json()
    // console.log(product);

    return <>

        <Card className='mx-auto mt-8 grid max-w-5xl items-center overflow-hidden border-0 bg-white shadow-xl dark:bg-gray-900 md:grid-cols-2'>
            <div>
                <Carusor images={product.images} title={product.title}/>
            </div>
            <div>
                <CardHeader>
                    <CardDescription className="font-semibold text-emerald-600">{product.brand.name}</CardDescription>
                    <CardTitle className="text-3xl font-black">{product.title}</CardTitle>
                    <CardDescription className="leading-7">{product.description}</CardDescription>

                </CardHeader>
                <CardContent>
                    <CardDescription>{product.category.name}</CardDescription>
                    <div className='flex items-center py-1.5'>
                        <MyStar />
                        <MyStar />
                        <MyStar />
                        <MyStar />
                        <CardTitle className='ms-1.5'>({product.ratingsAverage})</CardTitle>

                    </div>
                    <div className='flex justify-between items-center'>
                        <p className='font-bold py-1.5'>{product.price} EGP</p>
                        <p className='font-bold '>Quantity:{product.quantity} </p>
                    </div>
                </CardContent>
                <AddToCart productId={product._id}/>
            </div>
        </Card>

    </>
}
