'use client'

import { Button } from "../../components/Button";
import { InputControl, InputRoot } from "../../components/Form/Input";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, UserRoundCog } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { twMerge } from "tailwind-merge";
import { toastMessage } from "@/utils/helpers/toast-message";




const signInSchema = z.object({
    email: z.string().email("Insira um email válido"),
    password: z.string().min(3, "No mínimo 3 caracteres")
});

type signInSchema = z.infer<typeof signInSchema>

export default function Signin() {



    const { register, handleSubmit, formState: { errors } } = useForm<signInSchema>({
        resolver: zodResolver(signInSchema)
    })

    const { signIn, isLoading } = useAuth();
    async function signInUser(data: signInSchema) {

        const { email, password } = data

        try {
            await signIn(email, password);

        } catch (error: any) {
            return console.error(error.message)
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
            <div className="flex justify-center items-center gap-3">
                <UserRoundCog className="w-12 h-12 text-sky-500" />
                <h1 className="text-5xl py-2 font-bold">Support App</h1>
            </div>
            <form className="w-1/2 flex flex-col justify-center items-center gap-6 divide-y divide-zinc-700">

                <div className="flex flex-col gap-3 md:w-1/2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-300">
                        E-mail
                    </label>
                    <InputRoot className={twMerge(
                        "flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm",
                        "focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100",
                        "dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-500/20"
                    )}>
                        <InputControl id="email" type="email" placeholder='johndoe@email.com' {...register("email")} />
                    </InputRoot>
                    <p className="text-sm text-red-500 font-semibold">{errors.email?.message}</p>
                </div>

                <div className="flex flex-col gap-3 py-3 md:w-1/2">
                    <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                        Senha
                    </label>
                    <InputRoot className={twMerge(
                        "flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm",
                        "focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100",
                        "dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-500/20"
                    )
                    }>
                        <InputControl id="password" type="password" placeholder='******' {...register("password")} />
                    </InputRoot>
                    <p className="text-sm text-red-500 font-semibold">{errors.password?.message}</p>
                </div>

                <Button disabled={isLoading} onClick={handleSubmit(signInUser)} className="w-1/2 text-lg flex justify-center items-center gap-3">
                    {isLoading ? (
                        <LoaderCircle className="w-6 h-6 animate-spin" />
                    )
                        :
                        (
                            <span>Entrar</span>
                        )}
                </Button>
            </form>
        </div>
    )
}