import { tv, VariantProps } from 'tailwind-variants'
import { ButtonHTMLAttributes } from 'react'

const button = tv({
    base: [
        'rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm',
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
        'active:opacity-80',
    ],
    variants: {
        variant: {
            ghost:
                'rounded-md px-2 hover:bg-zinc-50 dark:hover:bg-white/5 shadow-none text-zinc-500 dark:text-zinc-400',
            primary:
                'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
            outline:
                'border-2 border-blue-300 text-zinc-700 hover:bg-zinc-50 dark:border-blue-700 dark:text-zinc-300 dark:hover:bg-zinc-800',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
})

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
    asChild?: boolean
}

export function Button({ asChild, variant, className, ...props }: ButtonProps) {

    return <button {...props} type='button' className={button({ variant, className })} />
}