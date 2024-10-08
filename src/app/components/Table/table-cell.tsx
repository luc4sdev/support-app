import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge'

interface TableCellProps extends ComponentProps<'td'> {
    className?: string;
}

export function TableCell({ className, ...rest }: TableCellProps) {
    return (
        <td {...rest} className={twMerge('py-3 px-4 text-sm text-zinc-950 dark:text-zinc-300', className)} />
    )
}