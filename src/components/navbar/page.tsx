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
import { HeartIcon, Loader, Menu, ShoppingCart, UserIcon } from 'lucide-react'
import ShopIcon from '../shopicon/page'
import { CartContext } from '../context/cartContext'
import { signOut, useSession } from 'next-auth/react'
import { WishlistContext } from '../context/wishListContext'
import ThemeToggle from '../themeToggle/page'

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/brands', label: 'Brands' },
  { href: '/categories', label: 'Categories' },
  { href: '/allorders', label: 'All orders' },
]

export default function Navbar() {
  const session = useSession()
  const { wishlistData, isLoading: wishlistLoading } = useContext(WishlistContext)
  const { cartData, isLoading } = useContext(CartContext)
  return <>
    <nav className='sticky top-0 z-50 border-b bg-white/85 p-3 font-semibold shadow-sm backdrop-blur dark:bg-gray-950/85'>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className='flex shrink-0 items-center justify-center'>
            <span className='pt-1'><ShopIcon /></span>
            <h1 className='text-xl'><Link href={'/'}>ShopMart</Link></h1>
          </div>
          <div className='hidden md:block'>
            <NavigationMenu>
              <NavigationMenuList className='gap-1 text-sm text-gray-700 dark:text-gray-200'>
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild>
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='flex cursor-pointer items-center gap-3'>
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger className='rounded-full border bg-white p-2 dark:bg-gray-900 md:hidden' aria-label='Open navigation menu'>
                <Menu className='size-5' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='z-999 w-48 md:hidden'>
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {navLinks.map((link) => (
                  <Link href={link.href} key={link.href}>
                    <DropdownMenuItem className='cursor-pointer'>{link.label}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
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
                    {isLoading ? <Loader className='size-3 animate-spin' /> : cartData?.numOfCartItems ?? 0}
                  </Badge>
                </Link>
                <Link href={'/wishlist'} className='relative'>
                  <HeartIcon />
                  <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-3 start-3">
                    {wishlistLoading ? <Loader className='size-3 animate-spin' /> : wishlistData?.count ?? 0}
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
