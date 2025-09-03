"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useDashboardQuery } from "@/hooks/useAdminQuery"
import { DashboardResponse } from "@/types/api"

const COLORS = ["#0088FE", "#FF8042"]

type BarChartItem = {
  label: string
  month: number
  year: number
  count: number
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardResponse>()
  const { data: dashboard, isLoading, error } = useDashboardQuery()
  const [barChartFormatter, setBarChartFormatter] = useState<BarChartItem[]>([])

  useEffect(() => {
    if (dashboard) {
      setData(dashboard.data)
      const temp = dashboard.data.bar_chart.map((item) => ({
        ...item,
        label: `${item.month}/${item.year}`,
      }))
      setBarChartFormatter(temp)
    }
  }, [dashboard])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Đang tải dữ liệu...
      </div>
    )
  }
  if (error || !data) {
    return <div>Lỗi khi tải dữ liệu Dashboard</div>
  }

  const pieData = [
    { name: "Bài viết nhạy cảm", value: data.pie_chart.sensitive_post },
    {
      name: "Bài viết bình thường",
      value: data.pie_chart.total_post - data.pie_chart.sensitive_post,
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Bảng điều khiển</h2>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số bài viết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.pie_chart.total_post}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Bài viết nhạy cảm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.pie_chart.sensitive_post}
            </div>
            <p className="text-xs text-muted-foreground">
              Chiếm{" "}
              {(
                (data.pie_chart.sensitive_post / data.pie_chart.total_post) *
                100
              ).toFixed(1)}
              % tổng số bài viết
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Danh mục</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.table.length}</div>
            <p className="text-xs text-muted-foreground">
              Số danh mục đang có bài viết
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Biểu đồ */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Bài viết theo tháng</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={barChartFormatter}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" />
                <YAxis allowDecimals={false} />
                <Tooltip
                  formatter={(value) => [`${value} bài viết`, "Số lượng"]}
                  labelFormatter={(label) => `Tháng ${label}`}
                />
                <Bar dataKey="count" fill="#4F46E5" name="Bài viết" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Phân bổ bài viết</CardTitle>
            <CardDescription>
              So sánh bài viết nhạy cảm và bình thường
            </CardDescription>
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
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChartComponent>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bảng danh mục */}
      <div className="grid gap-4 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Bài viết theo danh mục</CardTitle>
            <CardDescription>
              Thống kê số lượng bài viết trong từng danh mục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên danh mục</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead className="text-right">Số bài viết</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.table.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.cname}
                    </TableCell>
                    <TableCell>{item.cdesc}</TableCell>
                    <TableCell className="text-right">
                      {item.post_count}
                    </TableCell>
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
