import React from 'react'
import {
    DashboardCard,
    DashboardCardContent,
} from '@/components/(dashboard)/dashboard-card'
import UserDataCard, {
    UserDataCardProps,
} from '@/components/(dashboard)/user-data-card'
import UserPurchaseCard, {
    UserPurchaseProps,
} from '@/components/(dashboard)/user-purchase-card'
import {
    Calendar,
    DollarSign,
    PersonStanding,
    UserPlus,
    UserRoundCheck,
} from 'lucide-react'
import BarChart from '@/app/(dashboard)/stats/_components/barchart'
import LineGraph from '@/app/(dashboard)/stats/_components/line-graph'
import GoalDataCard from '@/app/(dashboard)/stats/_components/goal'
import { db } from '@/lib/db'
import {
    eachMonthOfInterval,
    endOfMonth,
    format,
    formatDistanceToNow,
    startOfMonth,
    subMonths,
} from 'date-fns'
import Breadcrumb from '@/components/common/bread-crumb'
import CheckUserRole from '@/components/check-user-role'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Stats"
}

export interface ChartData {
    month: string
    total: number
}

const Dashboard = async () => {
    const currentDate = new Date()
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const sixMonthsAgo = subMonths(currentDate, 6)

    const dateRange = {
        gte: sixMonthsAgo,
        lte: currentDate,
    }

    const [
        userCount,
        userCountMonth,
        salesCount,
        salesTotal,
        recentUsers,
        recentSales,
        usersThisMonth,
        salesThisMonth,
    ] = await Promise.all([
        db.user.count(),
        db.user.count({
            where: {
                createdAt: {
                    gte: monthStart,
                    lte: monthEnd,
                },
            },
        }),
        db.purchase.count(),
        db.purchaseItemRelation.aggregate({
            _sum: {
                price: true,
            },
        }),
        db.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 7,
            include: {
                images: {
                    take: 1,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        }),
        db.purchase.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                user: {
                    include: {
                        images: {
                            take: 1,
                            orderBy: {
                                createdAt: 'desc'
                            }
                        }
                    }
                },
                items: {
                    include: {
                        item: true
                    }
                },
            },
            where: {
                createdAt: dateRange,
            },
        }),
        db.user.groupBy({
            by: ['createdAt'],
            _count: true,
            orderBy: { createdAt: 'asc' },
            where: {
                createdAt: dateRange,
            },
        }),
        db.purchaseItemRelation.groupBy({
            by: ['purchaseId'],
            _sum: {
                price: true,
            },
            orderBy: { purchaseId: 'asc' },
        }),
    ])

    const totalAmount = salesTotal._sum.price ?? 0
    const goalAmount = 1000
    const goalProgress = (totalAmount / goalAmount) * 100

    const calculateSaleTotal = (items: any[]) =>
        items.reduce((total, itemRel) =>
            total + itemRel.price * itemRel.quantity, 0)

    const UserData: UserDataCardProps[] = recentUsers.map((account) => ({
        name: account.username ?? 'Unknown',
        email: account.email ?? 'Unknown',
        image: account.images[0]?.url ?? '/images/dashboard/mesh.png',
        time: formatDistanceToNow(new Date(account.createdAt), {
            addSuffix: true,
        }),
    }))

    const PurchaseData: UserPurchaseProps[] = recentSales.map((purchase) => ({
        name: purchase.user.username ?? 'Unknown',
        email: purchase.user.email ?? 'Unknown',
        image: purchase.user.images[0]?.url ?? '/images/dashboard/mesh.png',
        saleAmount: `$${calculateSaleTotal(purchase.items).toFixed(2)}`,
    }))

    const months = eachMonthOfInterval({
        start: sixMonthsAgo,
        end: monthEnd,
    })

    const getMonthString = (date: Date) => format(date, 'MMM')

    const monthlyUsersData: ChartData[] = months.map((month) => {
        const monthString = getMonthString(month)
        const userMonthly = usersThisMonth
            .filter(user => getMonthString(new Date(user.createdAt)) === monthString)
            .reduce((total, user) => total + user._count, 0)
        return { month: monthString, total: userMonthly }
    })

    const monthlySalesData: ChartData[] = months.map((month) => {
        const monthString = getMonthString(month)
        const salesInMonth = recentSales
            .filter(sale => getMonthString(new Date(sale.createdAt)) === monthString)
            .reduce((total, sale) => total + calculateSaleTotal(sale.items), 0)
        return { month: monthString, total: salesInMonth }
    })

    return (
        <>
            <div className="bg-gray-600">
                <Breadcrumb
                    pageName="Stats Page"
                    description="View your dashboard statistics and analytics."
                />
            </div>
            <CheckUserRole />
            <div className="bg-first">
                <div className="container mx-auto py-8">
                    <div className="flex flex-col space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Sales Data Column */}
                            <div className="flex flex-col space-y-6">
                                <h2 className="text-xl font-semibold">Sales Data</h2>
                                <div className="grid gap-6">
                                    <DashboardCard
                                        label="Total Revenue"
                                        Icon={DollarSign}
                                        amount={`$${totalAmount.toFixed(2)}`}
                                        description="All Time"
                                    />
                                    <DashboardCard
                                        label="Total Paid Subscriptions (Dating)"
                                        Icon={Calendar}
                                        amount={String(salesCount)}
                                        description="All Time"
                                    />
                                    <DashboardCard
                                        label="Total Paid RQ"
                                        Icon={Calendar}
                                        amount={String(salesCount)}
                                        description="All Time"
                                    />
                                </div>

                                <DashboardCardContent>
                                    <section className="flex justify-between gap-2 pb-2">
                                        <p>Recent Sales</p>
                                        <DollarSign className="h-4 w-4" />
                                    </section>
                                    {PurchaseData.map((data: UserPurchaseProps, index: number) => (
                                        <UserPurchaseCard key={index} {...data} />
                                    ))}
                                </DashboardCardContent>

                                <LineGraph data={monthlySalesData} />
                            </div>

                            {/* User Data Column */}
                            <div className="flex flex-col space-y-6">
                                <h2 className="text-xl font-semibold">User Data</h2>
                                <div className="grid gap-6">
                                    <DashboardCard
                                        label="Total Users"
                                        Icon={PersonStanding}
                                        amount={String(userCount)}
                                        description="All Time"
                                    />
                                    <DashboardCard
                                        label="Users This Month"
                                        Icon={UserPlus}
                                        amount={String(userCountMonth)}
                                        description="This Month"
                                    />
                                </div>

                                <DashboardCardContent>
                                    <section className="flex justify-between gap-2 pb-2">
                                        <p>Recent Users</p>
                                        <UserRoundCheck className="h-4 w-4" />
                                    </section>
                                    {UserData.map((data: UserDataCardProps, index: number) => (
                                        <UserDataCard key={index} {...data} />
                                    ))}
                                </DashboardCardContent>

                                <BarChart data={monthlyUsersData} />
                                <GoalDataCard goal={goalAmount} value={goalProgress} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard