import React, { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge'
interface InputPrefixProps extends ComponentProps<'div'> { }

export function InputPrefix(props: InputPrefixProps) {
    return (
        <div {...props} />
    )
}

interface InputControlProps extends ComponentProps<'input'> { }


export const InputControl = React.forwardRef<HTMLInputElement, InputControlProps>((props, ref) => {

    return (
        <input
            ref={ref}
            className="flex-1 border-0 bg-transparent p-0 text-zinc-900 placeholder-zinc-600 outline-none dark:placeholder-zinc-400 dark:text-zinc-100"
            {...props}
        />
    )
});
InputControl.displayName = 'InputControl';

interface InputRootProps extends ComponentProps<'div'> { }


export function InputRoot(props: InputRootProps) {
    return (
        <div className={twMerge(
            "flex w-56 items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm",
            "focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100",
            "dark:border-zinc-700 dark:bg-zinc-800 dark:focus-within:border-sky-500 dark:focus-within:ring-sky-500/20",
            props.className
        )
        } {...props} />
    )
}