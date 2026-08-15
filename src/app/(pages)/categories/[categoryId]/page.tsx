import { ProductI } from '@/interfaces';
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import MyStar from '@/components/myStar/page';
import Link from 'next/link';
import AddToCart from '@/components/addToCart/page';
import { Params } from 'next/dist/server/request/params';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic'

//Api
export default async function ProductsCategoey({ params }: { params: Params }) {
    const { categoryId } = await params
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products?category[in]=' + categoryId)
    const { data: products }: { data: ProductI[] } = await response.json()

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 gap-4 min-h-[50vh]">
                <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">There are no products in this category.😔</h2>
                <Link href="/categories" className="text-primary underline hover:opacity-80">
                    <Button className='cursor-pointer'>Return to all categories</Button>
                </Link>
            </div>
        )
    }
    return <>


        <div className="grid grid-cols-1 gap-5 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) =>
                <div key={product.id}>
                    <Card className="h-full overflow-hidden border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">
                        <Link href={'/products/' + product.id}>
                            <CardHeader>
                                <div className="rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <Image src={product.imageCover} className='h-52 w-full object-contain transition duration-300 hover:scale-105' width={240} height={240} alt={product.title} />
                                </div>
                                <CardDescription className="font-semibold text-emerald-600">{product.brand.name}</CardDescription>
                                <CardTitle className="line-clamp-1">{product.title.split(" ", 4).join(' ')}</CardTitle>
                                <CardDescription>{product.category.name}</CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className='flex items-center justify-between'>
                                    <div className='flex '>
                                        <MyStar />
                                        <MyStar />
                                        <MyStar />
                                        <MyStar />
                                        <p>{product.ratingsAverage}</p>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <p className=''><span className='font-bold'>{product.price}</span> EGP</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Link>

                        <AddToCart productId={product._id} />
                    </Card>
                </div>)}
        </div>


    </>
}
