'use client'
import React, { useContext, useRef } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { CartResponse } from '@/interfaces'
import { CartContext } from '../context/cartContext'
import { getUserToken } from '@/Helpers/getUserToken'


export default function Checkout({ cartId }: { cartId: string, }) {
    const router = useRouter()
    const { setCartData } = useContext(CartContext);

    let detailsInput = useRef<HTMLInputElement | null>(null)
    let cityInput = useRef<HTMLInputElement | null>(null)
    let phoneInput = useRef<HTMLInputElement | null>(null)

    //online orders
    async function checkOutSession() {
        const token = await getUserToken()
        const shippingAddress = {
            details: detailsInput.current?.value,
            phone: phoneInput.current?.value,
            city: cityInput.current?.value
        }
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            method: 'POST',
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token!,
                //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzNjNTkyNmZlYWZjMDAzZDQ4N2FjNCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0MzMzNzE4LCJleHAiOjE3NzIxMDk3MTh9.P9fsHDK95ExmaE0bs4dMqpif5yRwY-gqkSI0bhi1NIw',
                'content-type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);
        if (data.status == "success") {
            window.location.href = data.session.url
        }
    }

    // cash
    async function checkCash() {
        const token = await getUserToken()

        const shippingAddress = {
            details: detailsInput.current?.value,
            phone: phoneInput.current?.value,
            city: cityInput.current?.value
        }
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/' + cartId, {
            method: 'POST',
            body: JSON.stringify({ shippingAddress }),
            headers: {
                token: token!,
                //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzNjNTkyNmZlYWZjMDAzZDQ4N2FjNCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0MzMzNzE4LCJleHAiOjE3NzIxMDk3MTh9.P9fsHDK95ExmaE0bs4dMqpif5yRwY-gqkSI0bhi1NIw',
                'content-type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data);
        if (data.status == "success") {
            toast.success('ordered is successfully')
            router.push('/allorders')
            clearCart()
        }

    }
    //clear
    async function clearCart() {
        const token = await getUserToken()
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
            method: 'DELETE',
            headers: {
                token:token!
                //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzNjNTkyNmZlYWZjMDAzZDQ4N2FjNCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0MzMzNzE4LCJleHAiOjE3NzIxMDk3MTh9.P9fsHDK95ExmaE0bs4dMqpif5yRwY-gqkSI0bhi1NIw',
            }
        })
        const data: CartResponse = await response.json()
        console.log(data);
        if (data.message == 'success') {
            setCartData(null)
            toast.success('products clearing successefuly')
        }

    }

    return <>
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full mt-5 bg-black text-white cursor-pointer">Proceed to Checkout</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Shipping Address</DialogTitle>
                        <DialogDescription>
                            Make Sure That Your Entered The Correct Address.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>City</Label>
                            <Input ref={cityInput} id="city" />
                        </div>
                        <div className="grid gap-3">
                            <Label>Phone</Label>
                            <Input ref={phoneInput} id="phone" />
                        </div>
                        <div className="grid gap-3">
                            <Label>Details</Label>
                            <Input ref={detailsInput} id="details" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className='cursor-pointer' onClick={() => checkOutSession()}>Visa</Button>
                        <Button type="submit" className='cursor-pointer' onClick={() => checkCash()}>Cash</Button>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}