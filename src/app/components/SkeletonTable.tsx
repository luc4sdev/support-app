import { Table } from "./Table/table";
import { TableCell } from "./Table/table-cell";
import { TableHeader } from "./Table/table-header";
import { TableRow } from "./Table/table-row";

export function SkeletonTable() {
    return (
        <div className="w-full flex flex-col gap-4">
            <Table>
                <thead>
                    <tr className='border-b border-zinc-300/50 dark:border-white/10'>
                        {[...Array(7)].map((_, index) => (
                            <TableHeader key={index}>
                                <div className="h-4 bg-zinc-300/50 dark:bg-white/10 rounded w-full animate-pulse"></div>
                            </TableHeader>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(5)].map((_, index) => (
                        <TableRow key={index} className='border-b border-white/10'>
                            {[...Array(7)].map((_, cellIndex) => (
                                <TableCell key={cellIndex}>
                                    <div className="h-4 bg-zinc-300/50 dark:bg-white/10 rounded w-full animate-pulse"></div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            <div className="h-4 bg-zinc-300/50 dark:bg-white/10 rounded w-24 animate-pulse"></div>
                        </TableCell>
                        <TableCell className='text-right' colSpan={4}>
                            <div className='inline-flex items-center gap-8'>
                                <span className="h-4 bg-zinc-300/50 dark:bg-white/10 rounded w-16 animate-pulse"></span>
                                <div className='flex gap-1.5'>
                                    {[...Array(4)].map((_, buttonIndex) => (
                                        <div
                                            key={buttonIndex}
                                            className='h-4 w-8 bg-zinc-300/50 dark:bg-white/10 rounded animate-pulse'
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>
            </Table>

        </div>
    )
}