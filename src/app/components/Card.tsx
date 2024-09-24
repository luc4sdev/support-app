'use client'

import { Client } from "@/domain/entities/client";
import { ClientDataDialog } from "../clients/components/ClientDataDialog";
import { ElementType } from "react";

interface CardProps {
    title: string
    client?: Client
    index: number
    icon: ElementType
    setOpenCreateDialog: (openDialog: boolean) => void
    setClientToBeEdited?: (client: Client | null) => void
}

export function Card({ title, client, index, icon: Icon, setOpenCreateDialog, setClientToBeEdited }: CardProps) {

    return (
        <>
            <div className="lg:w-60 col-span-4 md:col-span-1 lg:col-span-1 bg-zinc-200 dark:bg-zinc-700 flex flex-col justify-center items-center py-3 gap-3 rounded-lg">
                <div className="w-full relative flex justify-center items-center">
                    <p>{title} {index + 1}</p>
                </div>
                <Icon className="w-28 h-28" />
                {(client && setClientToBeEdited) && (
                    <>
                        <p className="truncate">{client.name}</p>
                        <ClientDataDialog client={client} setOpenCreateClientDialog={setOpenCreateDialog} setClientToBeEdited={setClientToBeEdited} />
                    </>
                )}
            </div>
        </>
    )
}