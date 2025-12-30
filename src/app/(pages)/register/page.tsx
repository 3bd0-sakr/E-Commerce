"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Loader } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

//Schema 
export const formSchema = z.object({
  name: z.string().nonempty('Name is required'),
  email: z.string().nonempty('Email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email'),
  phone: z.string().nonempty('Phone is required').regex(/^01[0-9]{9}$/, 'Invalid Egyptian phone number'),
  password: z.string().nonempty('Password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Weak password'),
  rePassword: z.string().nonempty('Confirm password is required')
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords don't match",
  path: ["rePassword"],
})

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: ""
    },
  })

  //API 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setErrorMessage(null)
    setSuccessMessage(null)
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setErrorMessage(data.message || 'Something went wrong')
      } else {
        setSuccessMessage('Registered successfully!')
        form.reset()
        router.push('/login')
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col mx-auto justify-center items-center min-h-[75vh]'>
      <h1 className='my-3 text-2xl'>Register Now</h1>
      <Card className="p-5 w-[95%] lg:w-lg">
        <Form {...form}>
          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="010xxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm your password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-3">
              {isLoading && <Loader className="animate-spin mr-2" />} Submit
            </Button>
            <p>If you have an account, Please! <Link href={'/login'}><span className="text-blue-600">SignIn</span></Link> </p>
          </form>
        </Form>
      </Card>
    </div>
  )
}