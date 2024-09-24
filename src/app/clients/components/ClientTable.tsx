import { Search, MoreHorizontal, ChevronsLeft, ChevronRight, ChevronsRight, ChevronLeft, Pen, Trash } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ChangeEvent, useEffect, useState } from 'react'
import { Table } from '@/app/components/Table/table'
import { TableHeader } from '@/app/components/Table/table-header'
import { TableRow } from '@/app/components/Table/table-row'
import { TableCell } from '@/app/components/Table/table-cell'
import { IconButton } from '@/app/components/IconButton'
import { Client } from '@/domain/entities/client'
import { Button } from '@/app/components/Button'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteClient } from '@/hooks/client/useDeleteClient'
import { toastMessage } from '@/utils/helpers/toast-message'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')


interface ClientTableProps {
    allClients: Client[];
    setOpenCreateClientDialog: (openDialog: boolean) => void
    setClientToBeEdited: (client: Client | null) => void
}
export function ClientTable({ allClients, setOpenCreateClientDialog, setClientToBeEdited }: ClientTableProps) {


    const { mutate: mutateDeleteClient, isError: isErrorDeleteClient, error: errorDeleteClient, isPending } = useDeleteClient()
    const queryCLient = useQueryClient()

    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? ''
        }

        return ''
    })

    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'))
        }

        return 1
    })

    const [total, setTotal] = useState(0)
    const [clients, setClients] = useState<Client[]>([])

    useEffect(() => {
        setClients(allClients)
    }, [allClients])



    function handleOpenEditClientDialog(client: Client) {
        setOpenCreateClientDialog(true)
        setClientToBeEdited(client)
    }


    async function deleteClient(id: string) {
        mutateDeleteClient({
            id
        },
            {
                onSuccess: () => {
                    queryCLient.invalidateQueries({
                        queryKey: ['get-all-clients'],
                        exact: false
                    })
                    toastMessage({
                        message: 'Cliente deletado com sucesso!',
                        type: 'success'
                    })
                },
                onError: () => {
                    if (isErrorDeleteClient) {
                        console.error(errorDeleteClient)
                    }
                }
            })
    }

    const totalPages = Math.ceil(total / 10)


    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString())

        url.searchParams.set('search', search)

        window.history.pushState({}, "", url)

        setSearch(search)
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())

        url.searchParams.set('page', String(page))

        window.history.pushState({}, "", url)

        setPage(page)
    }

    function onSearchInputChandged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    function goToFirstPage() {
        setCurrentPage(1)
    }

    function goToNextPage() {

        setCurrentPage(page + 1)
    }

    function goToPreviousPage() {
        setCurrentPage(page - 1)
    }

    function goToLastPage() {
        setCurrentPage(totalPages)

    }

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className="flex gap-3 items-center">

                <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
                    <Search className='size-4 text-blue-300' />
                    <input onChange={onSearchInputChandged} value={search} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0 focus:ring-offset-0" placeholder="Buscar cliente..." />
                </div>
            </div>

            <Table>

                <thead>
                    <tr className='border-b border-white/10'>
                        <TableHeader style={{ width: 48 }} className='py-3 px-4 text-sm font-semibold text-left'>
                            <input className='size-4 bg-black/20 rounded border border-white/10 focus:ring-0 focus:ring-offset-0 checked:text-orange-400' type="checkbox" />
                        </TableHeader>

                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Telefone</TableHeader>
                        <TableHeader>Imagem</TableHeader>
                        <TableHeader>Ações</TableHeader>
                        <TableHeader style={{ width: 64 }} ></TableHeader>
                    </tr>
                </thead>

                <tbody>
                    {clients.map((client) => {
                        return (
                            <TableRow key={client.id} className='border-b border-white/10 hover:bg-white/5'>
                                <TableCell>
                                    <input className='size-4 bg-black/20 rounded border border-white/10 focus:ring-0 focus:ring-offset-0 checked:text-orange-400' type="checkbox" />
                                </TableCell>

                                <TableCell>{client.name}</TableCell>

                                <TableCell>{client.email}</TableCell>
                                <TableCell>{client.phone}</TableCell>
                                <TableCell>{client.phone}</TableCell>
                                <TableCell>
                                    <div className="flex flex-row items-end gap-x-2">
                                        asdsd
                                        <Button
                                            variant="primary"
                                            onClick={() => {
                                                handleOpenEditClientDialog(client)
                                            }}
                                            className="group px-2 py-2"
                                        >
                                            <Pen className="h-4 w-4 group-hover:text-zinc-100 dark:text-zinc-200" />
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={() => { deleteClient(client.id) }}
                                            className="px-2 py-2"
                                        >
                                            <Trash className="h-4 w-4 group-hover:text-zinc-100" />
                                        </Button>
                                    </div>
                                </TableCell>

                                <TableCell>{dayjs().to(client.createdAt)}</TableCell>

                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className='size-4' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>


                <tfoot>
                    <tr>
                        <TableCell colSpan={3}>
                            Mostrando {clients.length} de {total} itens
                        </TableCell>
                        <TableCell className='text-right' colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <span>Página {page} de {totalPages}</span>

                                <div className='flex gap-1.5'>
                                    <IconButton onClick={goToFirstPage} isButtondisabled={page === 1}>
                                        <ChevronsLeft className='size-4' />
                                    </IconButton>

                                    <IconButton onClick={goToPreviousPage} isButtondisabled={page === 1}>
                                        <ChevronLeft className='size-4' />
                                    </IconButton>

                                    <IconButton onClick={goToNextPage} isButtondisabled={page === totalPages}>
                                        <ChevronRight className='size-4' />
                                    </IconButton>

                                    <IconButton onClick={goToLastPage} isButtondisabled={page === totalPages}>
                                        <ChevronsRight className='size-4' />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
                </tfoot>


            </Table>
        </div>
    )
}