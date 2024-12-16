import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { HTMLAttributes } from 'react'

interface DashboardCardProps {
    label: string
    Icon: LucideIcon
    amount: any
    description: string
}

export const DashboardCard = ({
    label,
    Icon,
    amount,
    description,
}: DashboardCardProps) => {
    return (
        <div className="bg-slate-100/40 border shadow flex w-full flex-col gap-3 rounded-[6px] p-5">
            <section className="flex justify-between gap-2">
                <p className="text-black text-sm">{label}</p>
                <Icon className="text-black h-4 w-4" />
            </section>
            <section className="flex flex-col gap-2">
                <h2 className="text-black font-semibold text-2xl">{amount}</h2>
                <p className="text-black text-sm">{description}</p>
            </section>
        </div>
    )
}

export function DashboardCardContent(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={cn(
                "text-black border flex w-[448px] flex-col gap-3 rounded-[6px] p-5 shadow bg-slate-100/40",
                props.className
            )}
        />
    )
}