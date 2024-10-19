import React from 'react'
import { DashboardCard, DashboardCardContent } from '@/components/(dashboard)/dashboard-card'
import UserDataCard, { UserDataCardProps } from '@/components/(dashboard)/user-data-card'
import { db } from '@/lib/db'
import { Calendar, CreditCard, DollarSign, PersonStanding, UserPlus, UserRoundCheck } from 'lucide-react'
import { eachMonthOfInterval, endOfMonth, format, formatDistanceToNow, startOfMonth } from 'date-fns'
import UserPurchaseCard, { UserPurchaseProps } from '@/components/(dashboard)/user-purchase-card'
import BarChart from '@/app/(admin)/stats/_components/barchart'
import LineGraph from '@/app/(admin)/stats/_components/line-graph'
import GoalDataCard from '@/app/(admin)/stats/_components/goal'
import CheckUserRole from '@/components/CheckUserRole'
import Breadcrumb from '@/components/Common/Breadcrumb'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: "Stats"
}
const Dashboard = async () => {
    const currentDate = new Date()

    // Fetch data
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
                    gte: startOfMonth(currentDate),
                    lte: endOfMonth(currentDate),
                },
            },
        }),
        db.purchase.count(),
        db.purchase.aggregate({
            _sum: { amount: true },
        }),
        db.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 7,
        }),
        db.purchase.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: { user: true },
        }),
        db.user.groupBy({
            by: ['createdAt'],
            _count: { createdAt: true },
            orderBy: { createdAt: 'asc' },
        }),
        db.purchase.groupBy({
            by: ['createdAt'],
            _sum: { amount: true },
            orderBy: { createdAt: 'asc' },
        }),
    ])

    const totalAmount = salesTotal._sum.amount || 0
    const goalAmount = 1000
    const goalProgress = (totalAmount / goalAmount) * 100

    // Map data for User and Purchase cards
    const UserData: UserDataCardProps[] = recentUsers.map((account) => ({
        name: account.username || 'Unknown',
        email: account.email || 'Unknown',
        image: account.image || '/images/dashboard/mesh.png',
        time: formatDistanceToNow(new Date(account.createdAt), {
            addSuffix: true,
        }),
    }))

    // Map purchase data to UserPurchaseProps type
    const PurchaseData: UserPurchaseProps[] = recentSales.map((purchase) => ({
        name: purchase.user.username || 'Unknown',
        email: purchase.user.email || 'Unknown',
        image: purchase.user.image || '/images/dashboard/mesh.png',
        saleAmount: `$${(purchase.amount || 0).toFixed(2)}`,
    }))

    // Prepare Monthly Users Data
    const monthlyUsersData = eachMonthOfInterval({
        start: startOfMonth(
            new Date(usersThisMonth[0]?.createdAt || new Date())
        ),
        end: endOfMonth(currentDate),
    }).map((month) => {
        const monthString = format(month, 'MMM')
        const userMonthly = usersThisMonth
            .filter(
                (user) =>
                    format(new Date(user.createdAt), 'MMM') === monthString
            )
            .reduce((total, user) => total + user._count.createdAt, 0)
        return { month: monthString, total: userMonthly }
    })

    // Prepare Monthly Sales Data
    const monthlySalesData = eachMonthOfInterval({
        start: startOfMonth(
            new Date(salesThisMonth[0]?.createdAt || new Date())
        ),
        end: endOfMonth(currentDate),
    }).map((month) => {
        const monthString = format(month, 'MMM')
        const salesInMonth = salesThisMonth
            .filter(
                (sales) =>
                    format(new Date(sales.createdAt), 'MMM') === monthString
            )
            .reduce((total, sale) => total + (sale._sum.amount || 0), 0)
        return { month: monthString, total: salesInMonth }
    })

    return (
        <>
            <div className="bg-gray-600">
                <Breadcrumb
                    pageName="Stats Page"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
                />
            </div>
            <CheckUserRole />
            <div className=" bg-first flex flex-col gap-8 w-full">

                <div className="container mx-auto py-8">
                    <div className="flex flex-col gap-5 w-full">
                        <section
                            className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 gap-x-8 transition-all">
                            <DashboardCard
                                label="Total Revenue"
                                Icon={DollarSign}
                                amount={`$${totalAmount.toFixed(2)}`}
                                description="All Time"

                            />
                            <DashboardCard
                                label="Total Paid Subscriptions"
                                Icon={Calendar}
                                amount={`+${salesCount}`}
                                description="All Time"
                            />
                            <DashboardCard
                                label="Total Users"
                                Icon={PersonStanding}
                                amount={`+${userCount}`}
                                description="All Time"
                            />
                            <DashboardCard
                                label="Users This Month"
                                Icon={UserPlus}
                                amount={`+${userCountMonth}`}
                                description="This Month"
                            />
                        </section>

                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className=" -ml-4 flex flex-col lg:flex-row justify-between gap-4">
                                <section className="w-full lg:w-[calc(50%-1rem)]">
                                    <DashboardCardContent>
                                        <section className="flex justify-between gap-2 pb-2">
                                            <p>Recent Users</p>
                                            <UserRoundCheck className="h-4 w-4" />
                                        </section>
                                        {UserData.map((data, index) => (
                                            <UserDataCard key={index} {...data} />
                                        ))}
                                    </DashboardCardContent>
                                </section>
                                <section className="w-full lg:w-[calc(50%-1rem)]">
                                    <DashboardCardContent>
                                        <section className="flex justify-between gap-2 pb-2">
                                            <p>Recent Sales</p>
                                            <CreditCard className="h-4 w-4" />
                                        </section>
                                        {PurchaseData.map((data, index) => (
                                            <UserPurchaseCard key={index} {...data} />
                                        ))}
                                    </DashboardCardContent>
                                </section>
                            </div>
                        </div>
                        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 transition-all">
                            <BarChart data={monthlyUsersData} />
                            <LineGraph data={monthlySalesData} />
                        </section>
                        <GoalDataCard goal={goalAmount} value={goalProgress} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
