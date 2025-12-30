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

//Api
export default async function Products() {
  const response = await fetch(`${process.env.API_URL}/products`)
  const { data: products }: { data: ProductI[] } = await response.json()


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

            <AddToCart productId={product._id}/>
          </Card>
        </div>)}
    </div>


  </>
}
