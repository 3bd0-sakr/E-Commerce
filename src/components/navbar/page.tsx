'use client'
import React, { useContext } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { CarTaxiFront, HeartIcon, Loader, ShoppingCart, UserIcon } from 'lucide-react'
import ShopIcon from '../shopicon/page'
import { CartContext } from '../context/cartContext'
import { signOut, useSession } from 'next-auth/react'
import { WishlistContext } from '../context/wishListContext'

export default function Navbar() {
  const session = useSession()
  console.log(session);
  const { wishlistData, isLoading: wishlistLoading } = useContext(WishlistContext)
  const { cartData, isLoading } = useContext(CartContext)
  return <>
    <nav className='bg-gray-50 shadow rounded p-3 text-2xl font-semibold sticky top-0 z-99'>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className='flex items-center justify-center'>
            <span className='pt-1'><ShopIcon /></span>
            <h1><Link href={'/'}> Shop mart</Link></h1>
          </div>
          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/products">products</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/brands">Brands</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/categories">Categories</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/allorders">All orders</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='cursor-pointer flex'>
            <DropdownMenu>
              <DropdownMenuTrigger><UserIcon className='cursor-pointer' /></DropdownMenuTrigger>
              <DropdownMenuContent className='z-999 '>
                <DropdownMenuLabel >My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {session.status == 'authenticated' &&
                  <>
                    <Link href={'/profile'}> <DropdownMenuItem className='cursor-pointer'>Profile</DropdownMenuItem></Link>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => signOut({ callbackUrl: '/' })}>LogOut</DropdownMenuItem>
                  </>}
                {session.status == 'unauthenticated' &&
                  <>
                    <Link href={'/login'}> <DropdownMenuItem className='cursor-pointer'>Login</DropdownMenuItem></Link>
                    <Link href={'/register'}> <DropdownMenuItem className='cursor-pointer'>Register</DropdownMenuItem></Link>
                  </>}

              </DropdownMenuContent>
            </DropdownMenu>
            {session.status == 'authenticated' && <div >
              <div className='flex gap-3'>
                <Link href={'/cart'} className='relative'>
                  <ShoppingCart />
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 start-3">
                    {isLoading ? <Loader /> : cartData?.numOfCartItems}
                  </Badge>
                </Link>
                <Link href={'/wishlist'} className='relative'>
                  <HeartIcon />
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 start-3">
                    {wishlistLoading ? <Loader /> : wishlistData?.count}
                  </Badge>
                </Link>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </nav>
  </>
}
