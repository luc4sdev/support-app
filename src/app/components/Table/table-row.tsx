import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'> {
    className?: string;
}

export function TableRow({ className, ...rest }: TableRowProps) {
    return (
        <tr {...rest} className='border-b border-white/10 hover:bg-white/5' />
    )
}