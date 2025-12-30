import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image';
import { BrandI } from '@/interfaces';
import Link from 'next/link';
export default async function Brands() {
  //api 

  const response = await fetch(`${process.env.API_URL}/brands`)
  const { data: brands }: { data: BrandI[] } = await response.json()

  return <>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4'>
      {brands.map((brand) => 
        <Card key={brand._id}>
          <Link href={'/brands/'+brand._id}>
          <CardHeader>
            <CardTitle>
              <Image src={brand.image} width={250} height={300} alt='' />
            </CardTitle>
            <CardDescription>{brand.slug}</CardDescription>
          </CardHeader>

          <CardFooter>
            <p>{brand.name}</p>
          </CardFooter>
          </Link>
        </Card>
      )}

    </div>

  </>
}
