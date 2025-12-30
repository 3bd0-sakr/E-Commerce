import { CategoryI } from '@/interfaces';
import React from 'react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image';
import Link from 'next/link';
export default async function Categories() {

  const response = await fetch(`${process.env.API_URL}/categories`)
  const { data: categories }: { data: CategoryI[] } = await response.json();
  console.log(categories);

  return <>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4'>
      {categories.map((category) =>
        <Card key={category._id}>

          <Link href={'/categories/'+ category._id}>
            <CardHeader>
              <CardTitle>
                <Image src={category.image} width={250} height={300} alt='' className='w-full h-64 object-contain rounded-xl'  />
              </CardTitle>
              <CardDescription>{category.slug}</CardDescription>
            </CardHeader>

            <CardFooter>
              <p>{category.name}</p>
            </CardFooter>
          </Link>
        </Card>

      )}

    </div>

  </>
}
