import { ProductI } from '@/interfaces';
import React from 'react'
import Reveal from '@/components/Reveal/Reveal';
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

export const dynamic = 'force-dynamic'

//Api
export default async function Products() {
  const response = await fetch(`${process.env.API_URL}/products`)
  const { data: products }: { data: ProductI[] } = await response.json()


  return <>

    <div className="py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">ShopMart collection</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Products</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Explore trending products and add your favorites in one click.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) =>
          <div key={product.id}>
           <Reveal>
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
           </Reveal>
          </div>)}
      </div>
    </div>


  </>
}
