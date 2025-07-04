"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { FormField } from "./Input";
import { useRouter } from "next/navigation";


const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-in' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter()

  const formSchema = authFormSchema(type)

  const isSignIn = type === "sign-in";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type === 'sign-up'){
        toast.success('Account created successfully. Please sign in.')
        console.log('Sign in', values)
        router.push('/signin')
      }else{
        toast.success('Successfully sign in.')
        router.push('/')
        console.log('Sign up', values)
      }
    } catch (error) {
        console.log(error)
        toast.error(`There is an error : ${error}`)
    }
  }

  return (
    <div className="card-border lg:min-w-[560px]">
      <div className="flex flex-col gap-6 py-14 px-10 card ">
        <div className="flex items-center justify-center gap-4">
          <Image src={"./logo.svg"} width={50} height={50} alt="logo" />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3 className="text-center">Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-4 form"
          >
            {!isSignIn && <FormField name='name' label="First Name" control={form.control} placeholder="Enter your name"/>}

            <FormField name='email' label="Email" control={form.control} type = 'email' placeholder="Enter your email"/>

            <FormField name='password' label="Passowrd" type="password" control={form.control} placeholder="Enter your password"/>

            <Button type="submit" className="btn">
              {isSignIn ? "Sign in" : "Create an account"}
            </Button>
          </form>
        </Form>
      <div className="flex items-center justify-center gap-4">
        {isSignIn ? <p>Not account yet?</p> : <p>Already have account?</p>}
        <Link href={isSignIn ? "/signup" : "/signin"} className="font-bold">
          {isSignIn ? <p>Sign up</p> : <p>Sign in</p>}
        </Link>
      </div>
      </div>
    </div>
  );
};
export default AuthForm;
