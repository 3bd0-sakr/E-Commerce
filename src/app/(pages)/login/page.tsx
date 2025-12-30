"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signIn } from "next-auth/react"
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
import { useSearchParams } from "next/navigation"
import { Loader } from "lucide-react"
import Link from "next/link"

//schema
export const formSchema = z.object({
  email: z.string().nonempty('email is required').regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email'),
  password: z.string().nonempty('password is required').regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'week password'),
});

export default function Login() {
  const searchParams = useSearchParams()
  console.log(searchParams.get('error'));
  const [isLoading, setIsLoading] = useState(false)

  //Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  //Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/',
      redirect: true
    })
    console.log(response)
    setIsLoading(false)
  }

  return <>
    <div className='flex flex-col mx-auto justify-center items-center min-h-[75vh]'>
      <h1 className='my-3 text-2xl'>Login Now</h1>
      <Card className="p-5 w-[95%] lg:w-lg">
        <Form {...form}>
          {searchParams.get('error') && <h2 className="text-red-600 text-center">{searchParams.get('error')}</h2>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Abdo@example.com" {...field} className="mb-2" />
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
                    <Input placeholder="Enter the password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-3 cursor-pointer">{isLoading && <Loader className="animate-spin" />}Submit</Button>
          </form>
          <div className="flex justify-between">
            <p>If You Don't Have Account, Please! <Link href={'/register'}><span className="text-blue-600">SignUp</span></Link> </p>
            <p><Link href={'/forgetpassword'}><span className="text-blue-600">Forget Password?</span></Link> </p>
          </div>
        </Form>
      </Card>
    </div>

  </>
}
