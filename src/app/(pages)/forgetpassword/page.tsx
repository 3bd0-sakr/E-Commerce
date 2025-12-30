"use client"
import React, { useState } from 'react'

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
import { Card } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const formSchema = z.object({ email: z.email("invalid email").nonempty("email is required").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email"), })

const formSchemaTwo = z.object({ resetCode: z.string().nonempty("reset code is required").max(6, "max length is 6 chars"), })

const formSchemaThree = z.object({ password: z.string().nonempty("password is required").max(20, "max length is 20 chars").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "weak password"), })


type FormFields = z.infer<typeof formSchema>
type FormFieldsTwo = z.infer<typeof formSchemaTwo>
type FormFieldsThree = z.infer<typeof formSchemaThree>


export default function ForgetPassword() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingTwo, setIsLoadingTwo] = useState(false)
    const [isLoadingThree, setIsLoadingThree] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [formName, setFormName] = useState("email")

    let searchParams = useSearchParams()

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    const formTwo = useForm<FormFieldsTwo>({
        resolver: zodResolver(formSchemaTwo),
        defaultValues: {
            resetCode: ""
        },
    })
    const formThree = useForm<FormFieldsThree>({
        resolver: zodResolver(formSchemaThree),
        defaultValues: {
            password: ""
        },
    })


    async function onSubmit(values: FormFields) {


        setIsLoading(true)

        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
            method: "POST",
            body: JSON.stringify({
                email: values.email,
            }),
            headers: { "content-type": "application/json" }

        })
        const data = await response.json()
        setIsLoading(false)
        if (data.statusMsg == "success") {
            toast.success(`${data.message} (valid for 10 min)`)
            setFormName("reset code")
            setUserEmail(values.email)
        }
        if (data.statusMsg != "success") {
            toast.error(data.message)
        }
    }

    async function onSubmitTwo(values: FormFieldsTwo) {
        setIsLoadingTwo(true)

        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
            method: "POST",
            body: JSON.stringify({
                resetCode: values.resetCode

            }),
            headers: { "content-type": "application/json" }


        })
        const data = await response.json()


        setIsLoadingTwo(false)
        if (data.status == "Success") {
            toast.success("Correct reset code")
            setFormName("password")
        }
        if (data.statusMsg == "fail") {
            toast.error(data.message)
        }
    }
    async function onSubmitThree(values: FormFieldsThree) {
        setIsLoadingThree(true)

        const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
            method: "PUT",
            body: JSON.stringify({
                email: userEmail,
                newPassword: values.password

            }),
            headers: { "content-type": "application/json" }


        })
        const data = await response.json()


        setIsLoadingThree(false)
        if (data.token) {
            toast.success("Password changed successfully")
            router.push("/login")
        }
        if (data.statusMsg == "fail") {
            toast.error(data.message)
        }
    }


    return <>
        <div className="flex flex-col mx-auto justify-center items-center min-h-[75vh]">

            <h1 className='my-3 text-2xl'>Forget password</h1>


            {formName == "email" && <Card className='p-5 w-[90%] lg:w-lg'>

                <Form {...form}>
                    {searchParams.get("error") && <h2 className='text-red-400'>{searchParams.get("error")}</h2>}
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Enter Your Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Abdo@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='w-full cursor-pointer' type="submit">{isLoading && <Loader2 className='animate-spin' />}Submit</Button>
                    </form>
                </Form>
            </Card>}
            {formName == "reset code" && <Card className='p-5 w-[90%] lg:w-md'>

                <Form {...formTwo}>
                    {searchParams.get("error") && <h2 className='text-red-400'>{searchParams.get("error")}</h2>}
                    <form onSubmit={formTwo.handleSubmit(onSubmitTwo)} className="space-y-8">
                        <FormField
                            control={formTwo.control}
                            name="resetCode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>enter reset code that sent to your email</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='w-full cursor-pointer' type="submit">{isLoadingTwo && <Loader2 className='animate-spin' />}Submit</Button>
                    </form>
                </Form>
            </Card>}
            {formName == "password" && <Card className='p-5 w-[90%] lg:w-md'>

                <Form {...formThree}>
                    {searchParams.get("error") && <h2 className='text-red-400'>{searchParams.get("error")}</h2>}
                    <form onSubmit={formThree.handleSubmit(onSubmitThree)} className="space-y-8">
                        <FormField
                            control={formThree.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>enter new password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='w-full cursor-pointer' type="submit">{isLoadingThree && <Loader2 className='animate-spin' />}Submit</Button>
                    </form>
                </Form>
            </Card>}

        </div>
    </>
}