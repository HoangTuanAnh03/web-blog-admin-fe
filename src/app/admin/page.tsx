"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart as PieChartComponent,
    Pie,
    Cell,
    Legend,
} from "@/components/ui/chart"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {useEffect, useState} from "react"
import {useDashboardQuery} from "@/hooks/useAdminQuery";
import {DashboardResponse} from "@/types/api";
import { useRouter } from "next/navigation"


// Colors for pie chart
const COLORS = ["#0088FE", "#FF8042"]
type BarChartItem = {
    label: string;
    month: number;
    year: number;
    count: number;
}
export default function AdminDashboard() {
    const [data, setData] = useState<DashboardResponse>()
    const {data: dashboard, isLoading, error} = useDashboardQuery()
    const [barChartFormatter, setBarChartFormatter] = useState<BarChartItem[]>([])
    const router = useRouter()

    useEffect(() => {
        if (dashboard) {
            setData(dashboard.data)
            const temp = dashboard.data.bar_chart.map(item => ({
                ...item,
                label: `${item.month}/${item.year}`
            }))
            setBarChartFormatter(
                temp
            )
        }
    }, [dashboard]);

    // useEffect(() => {
    //     if (error || (!isLoading && !dashboard)) {
    //         router.push("/login")
    //     }
    // }, [dashboard, error, isLoading, router])

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }
    if (error || !data) {
        return <div>Error loading dashboard</div>
    }

    const pieData = [
        {name: "Sensitive Posts", value: data.pie_chart.sensitive_post},
        {name: "Regular Posts", value: data.pie_chart.total_post - data.pie_chart.sensitive_post},
    ]

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.pie_chart.total_post}</div>
                        {/*<p className="text-xs text-muted-foreground">+0% from last month</p>*/}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sensitive Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.pie_chart.sensitive_post}</div>
                        <p className="text-xs text-muted-foreground">
                            {((data.pie_chart.sensitive_post / data.pie_chart.total_post) * 100).toFixed(1)}% of total
                            posts
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data.table.length}</div>
                        <p className="text-xs text-muted-foreground">Active categories with content</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Posts by Month</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={barChartFormatter}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis
                                    dataKey="label"
                                    // tickFormatter={(value) => String(value).substring(0, 3)}
                                />
                                <YAxis allowDecimals={false}/>
                                <Tooltip
                                    formatter={(value, name) => [`${value} posts`, "Count"]}
                                    labelFormatter={(label) =>
                                        `${label}/${data.bar_chart.find((item: any) => item.month === label)?.year}`
                                    }
                                />
                                <Bar dataKey="count" fill="#8884d8" name="Posts"/>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Post Distribution</CardTitle>
                        <CardDescription>Sensitive vs. Regular Posts</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChartComponent>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                </Pie>
                                <Legend/>
                            </PieChartComponent>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Posts by Category</CardTitle>
                        <CardDescription>Distribution of posts across categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Category Description</TableHead>
                                    <TableHead className="text-right">Post Count</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.table.map((item: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{item.cname}</TableCell>
                                        <TableCell >{item.cdesc}</TableCell>
                                        <TableCell className="text-right">{item.postCount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
