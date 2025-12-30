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


//Api
export default async function ProductsCategoey({ params }: { params: Params }) {
    let { categoryId } = await params
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products?category[in]=' + categoryId)
    const { data: products }: { data: ProductI[] } = await response.json()

    if (!products || products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-20 gap-4 min-h-[50vh]">
                <h2 className="text-xl font-semibold text-gray-600">There are no products in this category.😔</h2>
                <Link href="/categories" className="text-primary underline hover:opacity-80">
                    <Button className='cursor-pointer'>Return to all categories</Button>
                </Link>
            </div>
        )
    }
    return <>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
            {products.map((product) =>
                <div key={product.id}>
                    <Card>
                        <Link href={'/products/' + product.id}>
                            <CardHeader>
                                <Image src={product.imageCover} className='w-full' width={200} height={150} alt='' />
                                <CardDescription>{product.brand.name}</CardDescription>
                                <CardTitle>{product.title.split(" ", 2).join(' ')}</CardTitle>
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
