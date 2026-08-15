import React from 'react'
import Reveal from '@/components/Reveal/Reveal';
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

export const dynamic = 'force-dynamic'

export default async function Brands() {
  //api 

  const response = await fetch(`${process.env.API_URL}/brands`)
  const { data: brands }: { data: BrandI[] } = await response.json()

  return <>
    <div className="py-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Trusted names</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">Brands</h1>
      </div>
      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {brands.map((brand) =>
          <Reveal key={brand._id}>
            <Card  className="overflow-hidden border-0 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">
              <Link href={'/brands/' + brand._id}>
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
          </Reveal>
        )}

      </div>
    </div>

  </>
}
