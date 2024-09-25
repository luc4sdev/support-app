import { UserRoundCog } from "lucide-react"

export function Logo() {
    return (
        <a href="/clients" className="flex mx-1 items-center gap-3 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            <UserRoundCog className="w-8 h-8 text-sky-500" />
            <span>Support App</span>
        </a>
    )
}