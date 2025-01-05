"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// Define a type for form variants
type FormType = 'sign-in' | 'sign-up'

// Define the schema for the form
const authFormSchema = (formType: FormType) => {
  if (formType === 'sign-up') {
    // For "sign-up" form, include fullName and email
    return z.object({
      fullName: z.string().min(2, "Full name should be at least 2 characters").max(50),
      email: z.string().email("Invalid email address"),
    })
  } else {
    // For "sign-in" form, only include email
    return z.object({
      email: z.string().email("Invalid email address"),
    })
  }
}

const AuthForm = ({ type }: { type: FormType }) => {
  // Dynamically get the schema based on form type
  const formSchema = authFormSchema(type)

  // Define the form using react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  })

  // Define the submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="font-bold">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          
          {/* Render fullName field only for "sign-up" form */}
          {type === 'sign-up' && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div>
                    <FormLabel className="shad-form-label">Full Name</FormLabel>
                  </div>
                  <FormControl>
                    <Input className="shad-input" placeholder="Enter Your Full Name" {...field} />
                  </FormControl>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          {/* Email field for both sign-in and sign-up */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div>
                  <FormLabel className="shad-form-label">Email</FormLabel>
                </div>
                <FormControl>
                  <Input className="shad-input" placeholder="Enter Your Email" {...field} />
                </FormControl>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button type="submit" className="mt-5">
            {type === "sign-in" ? "Sign In" : "Sign Up"}
          </Button>

          {/* Toggle between sign-in and sign-up */}
          <div className="mt-3">
            <p>
              {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
              <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  )
}

export default AuthForm
