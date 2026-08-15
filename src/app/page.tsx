'use client'
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

export default function Home() {
  const session = useSession()

  return <>
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        {session.status == 'authenticated' &&
          <p className="mb-4 text-sm font-semibold text-emerald-600">Welcome back, {session.data.user.name}</p>}
        <div className="mb-5 inline-flex rounded-full border bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm dark:bg-gray-900/80 dark:text-gray-300">
          Fresh picks, fast delivery, smooth shopping
        </div>
        <h1 className="text-5xl font-black tracking-tight text-gray-950 dark:text-white md:text-7xl">
          Upgrade your cart with smarter finds.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Discover technology, fashion, and lifestyle products with guaranteed quality,
          quick shipping, and a calmer checkout experience.
        </p>
      </div>
      <div className="my-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href={'/products'}>
          <Button className="h-12 rounded-full px-7 text-base font-semibold shadow-lg shadow-emerald-200">
            Shop Now <ArrowRight className="ml-2 size-4" />
          </Button>
        </Link>
        <Link href={'/categories'}>
          <Button variant="outline" className="h-12 rounded-full bg-white px-7 text-base font-semibold dark:bg-gray-900">
            Browse Categories
          </Button>
        </Link>
      </div>
      <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
        {[
          { icon: ShoppingBag, title: "Curated products", text: "Browse hand-picked categories and trusted brands." },
          { icon: Truck, title: "Fast shipping", text: "Clear cart flow with free shipping summary." },
          { icon: ShieldCheck, title: "Secure checkout", text: "Account-based shopping with saved orders." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-3xl border bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900/85">
            <Icon className="mb-4 size-8 text-emerald-600" />
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{text}</p>
          </div>
        ))}
      </div>
    </section>

  </>
}
