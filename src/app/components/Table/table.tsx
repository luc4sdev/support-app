import { ComponentProps } from "react";

interface TableProps extends ComponentProps<'table'> { }

export function Table({ ...rest }: TableProps) {
    return (
        <div className='overflow-x-auto border border-zinc-300/50 dark:border-white/10 rounded-lg'>
            <table {...rest} className='w-full' />
        </div>
    )
}