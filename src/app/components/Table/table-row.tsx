import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'> {
    className?: string;
}

export function TableRow({ className, ...rest }: TableRowProps) {
    return (
        <tr {...rest} className='border-b border-zinc-300/50 dark:border-white/10 hover:bg-zinc-600/5 dark:hover:bg-white/5' />
    )
}