import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<'button'> {
    transparent?: boolean;
    isButtondisabled?: boolean;
}

export function IconButton({ transparent, isButtondisabled, ...rest }: IconButtonProps) {
    return (
        <button
            {...rest}
            disabled={isButtondisabled}
            className={twMerge(
                'border border-zinc-300 dark:border-white/10 rounded-md p-1.5',
                transparent ? 'bg-black/20' : 'bg-white/10',
                isButtondisabled ? 'opacity-50' : null
            )}
        />
    )
}