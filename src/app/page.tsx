'use client'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const session = useSession()

  return <>
    <section>

      <div className="text-center my-15">
        {session.status == 'authenticated' &&
          <h2 className="text-center my-3">hi {session.data.user.name}</h2>}
        <h1 className="font-extrabold text-5xl my-2.5">Welcome to ShopMart</h1>
        <p className="text-xl">Discover the latest technology, fashion, and lifestyle product. Quality guaranteed with fast shopping</p>
        <p className="text-xl">and excellent customer service</p>
      </div>
      <div className="flex justify-center gap-2 my-6">
        <Link href={'/products'}>
          <Button className="hover:text-black hover:bg-white m-1.5 cursor-pointer text-2xl p-5">Shop Now</Button>
        </Link>
        <Link href={'/categories'}>
          <Button className="text-black bg-white border-2 hover:text-white hover:bg-black m-1.5 cursor-pointer text-2xl p-5">Browse Categories</Button>
        </Link>
      </div>

    </section>

  </>
}
