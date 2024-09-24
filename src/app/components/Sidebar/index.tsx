'use client'

import { Logo } from "./Logo";
import { User, Menu } from 'lucide-react'
import { NavItem } from "./NavItem";
import * as Collapsible from '@radix-ui/react-collapsible'
import { Button } from "../Button";


export function Sidebar() {
    return (
        <Collapsible.Root className="fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0 data-[state=open]:overflow-y-hidden lg:right-auto  lg:w-80 lg:border-r lg:px-5 lg:py-8 lg:data-[state=closed]:bottom-0 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between">
                <Logo />
                <Collapsible.Trigger asChild className="lg:hidden">
                    <Button variant="ghost">
                        <Menu className="w-6 h-6" />
                    </Button>
                </Collapsible.Trigger>
            </div>

            <Collapsible.Content forceMount className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex">
                <nav className="space-y-0.5">
                    <NavItem url="/clients" title="Clientes" icon={User} />
                </nav>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}