import React from 'react'
import { DashboardCard, DashboardCardContent } from '@/components/(dashboard)/dashboard-card'
import UserDataCard, { UserDataCardProps } from '@/components/(dashboard)/user-data-card'
import { db } from '@/lib/db'
import { Calendar, DollarSign, PersonStanding, UserPlus, UserRoundCheck } from 'lucide-react'
import { eachMonthOfInterval, endOfMonth, format, formatDistanceToNow, startOfMonth } from 'date-fns'
import UserPurchaseCard, { UserPurchaseProps } from '@/components/(dashboard)/user-purchase-card'
import BarChart from '@/app/(dashboard)/stats/_components/barchart'
import LineGraph from '@/app/(dashboard)/stats/_components/line-graph'
import GoalDataCard from '@/app/(dashboard)/stats/_components/goal'
import CheckUserRole from '@/components/check-user-role'
import Breadcrumb from '@/components/common/bread-crumb'
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
        db.purchased.count(),
        db.purchaseItem.aggregate({
            _sum: {
                price: true,
            },
        }),
        db.user.findMany({
            orderBy: { createdAt: 'desc' },
            take: 7,
        }),
        db.purchased.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                user: true,
                items: true,
            },
            where: {
                createdAt: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
                }
            }
        }),
        db.user.groupBy({
            by: ['createdAt'],
            _count: true,  // This returns { _count: number }
            orderBy: { createdAt: 'asc' },
            where: {
                createdAt: {
                    gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
                }
            }
        }),
        // For sales data, we'll query purchase items and group them
        db.purchaseItem.groupBy({
            by: ['purchasedId'],
            _sum: {
                price: true
            },
            orderBy: { purchasedId: 'asc' },
        })
    ]);

    const totalAmount = salesTotal._sum.price || 0;

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

    // Map purchase data with corrected total calculation
    const PurchaseData: UserPurchaseProps[] = recentSales.map((purchase) => ({
        name: purchase.user.username || 'Unknown',
        email: purchase.user.email || 'Unknown',
        image: purchase.user.image || '/images/dashboard/mesh.png',
        saleAmount: `$${purchase.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`,
    }));

    // Prepare Monthly Users Data - Last 6 months
    const monthlyUsersData = eachMonthOfInterval({
        start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        end: endOfMonth(currentDate),
    }).map((month) => {
        const monthString = format(month, 'MMM')
        const userMonthly = usersThisMonth
            .filter(
                (user) =>
                    format(new Date(user.createdAt), 'MMM') === monthString
            )
            .reduce((total, user) => total + user._count, 0) // Changed from user._count.createdAt
        return { month: monthString, total: userMonthly }
    })

    // Prepare Monthly Sales Data - Last 6 months
    const monthlySalesData = eachMonthOfInterval({
        start: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        end: endOfMonth(currentDate),
    }).map((month) => {
        const monthString = format(month, 'MMM')
        // Calculate total sales for this month from recentSales
        const salesInMonth = recentSales
            .filter(sale => format(new Date(sale.createdAt), 'MMM') === monthString)
            .reduce((total, sale) => {
                const saleTotal = sale.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
                return total + saleTotal
            }, 0)

        return { month: monthString, total: salesInMonth }
    });

    return (
        <>
            <div className="bg-gray-600">
                <Breadcrumb
                    pageName="Stats Page"
                    description="View your dashboard statistics and analytics."
                />
            </div>
            <CheckUserRole />
            <div className="bg-first flex flex-col gap-8 w-full">
                <div className="container mx-auto py-8">
                    <div className="flex flex-col gap-5 w-full">
                        <section className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 gap-x-8 transition-all">
                            <DashboardCard
                                label="Total Revenue"
                                Icon={DollarSign}
                                amount={`$${totalAmount.toFixed(2)}`}
                                description="All Time"
                            />
                            <DashboardCard
                                label="Total Paid Subscriptions"
                                Icon={Calendar}
                                amount={`${salesCount}`}
                                description="All Time"
                            />
                            <DashboardCard
                                label="Total Users"
                                Icon={PersonStanding}
                                amount={`${userCount}`}
                                description="All Time"
                            />
                            <DashboardCard
                                label="Users This Month"
                                Icon={UserPlus}
                                amount={`${userCountMonth}`}
                                description="This Month"
                            />
                        </section>

                        <div className="container mx-auto px-4 max-w-7xl">
                            <div className="-ml-4 flex flex-col lg:flex-row justify-between gap-4">
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
                                            <DollarSign className="h-4 w-4" />
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