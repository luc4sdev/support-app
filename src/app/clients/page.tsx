'use client'

import { useGetAllClients } from "@/hooks/client/useGetAllClients";
import { useEffect, useState } from "react";
import { Client } from "@/domain/entities/client";
import { CreateClientDialog } from "./components/CreateClientDialog";
import { ClientTable } from "./components/ClientTable";
import { SkeletonTable } from "../components/SkeletonTable";

export default function Clients() {

    const [openClientDialog, setOpenCreateClientDialog] = useState(false)
    const [clientToBeEdited, setClientToBeEdited] = useState<Client | null>()
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="mt-6 flex flex-col px-6 gap-10">
            <h1 className="text-center lg:text-2xl">Verifique todos os clientes cadastrados</h1>

            <div className="flex flex-col gap-5">
                <div className="flex justify-end px-6">
                    <CreateClientDialog
                        openClientDialog={openClientDialog}
                        setOpenCreateClientDialog={setOpenCreateClientDialog}
                        clientToBeEdited={clientToBeEdited!}
                        setClientToBeEdited={setClientToBeEdited}
                    />
                </div>

                <div className="flex">
                    {isLoading ? (
                        <SkeletonTable />
                    )
                        :
                        (<ClientTable setClientToBeEdited={setClientToBeEdited} setOpenCreateClientDialog={setOpenCreateClientDialog} />)
                    }
                </div>
            </div>
        </div>
    )
}