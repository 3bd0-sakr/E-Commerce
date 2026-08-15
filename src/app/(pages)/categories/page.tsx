import { CategoryI } from '@/interfaces';
import Reveal from '@/components/Reveal/Reveal';
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

export const dynamic = 'force-dynamic'

export default async function Categories() {

  const response = await fetch(`${process.env.API_URL}/categories`)
  const { data: categories }: { data: CategoryI[] } = await response.json();

  return <>
    <div className="py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Browse by need</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Categories</h1>
      </div>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {categories.map((category) =>
          <Reveal key={category._id}>
            <Card  className="overflow-hidden border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">

              <Link href={'/categories/' + category._id}>
                <CardHeader>
                  <CardTitle>
                    <Image src={category.image} width={250} height={300} alt='' className='w-full h-64 object-contain rounded-xl' />
                  </CardTitle>
                  <CardDescription className="capitalize">{category.slug}</CardDescription>
                </CardHeader>

                <CardFooter>
                  <p>{category.name}</p>
                </CardFooter>
              </Link>
            </Card>
          </Reveal>
        )}

      </div>
    </div>

  </>
}
