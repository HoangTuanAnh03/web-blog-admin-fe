"use client"

import { useState, useEffect } from "react"
import { Bell, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import {apiService} from "@/lib/api-service";
import {Notification} from "@/types/api";



export function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch notifications when dropdown is opened
  useEffect(() => {
    if (isOpen) {
      loadNotifications()
    }
  }, [isOpen])

  // Hàm để tải thông báo
  const loadNotifications = async () => {
    setIsLoading(true)
    try {
      const response = await apiService.fetchNotifications()
      if (response.code === 200) {
        setNotifications(response.data)
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const unreadCount = notifications.filter((notif) => !notif.isRead).length

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id
          ? {
              ...notif,
              read: true,
            }
          : notif,
      ),
    )
  }

  // Format thời gian thông báo
  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} phút trước`
    } else if (diffHours < 24) {
      return `${diffHours} giờ trước`
    } else if (diffDays < 7) {
      return `${diffDays} ngày trước`
    } else {
      return formatDate(date)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">Thông báo</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <DropdownMenuLabel className="text-base">Thông báo</DropdownMenuLabel>
          {/*{unreadCount > 0 && (*/}
          {/*  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">*/}
          {/*    <Check className="h-3.5 w-3.5 mr-1" />*/}
          {/*    Đánh dấu tất cả đã đọc*/}
          {/*  </Button>*/}
          {/*)}*/}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>Đang tải thông báo...</p>
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 cursor-pointer ${notification.isRead ? "" : "bg-muted/50"}`}
                onClick={() => markAsRead(notification.id)}
              >
                <Link href={`/blogs/${notification.postId}`} className="flex gap-3 w-full">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      {notification.message}
                      <span className="font-medium"> {notification.postTitle}</span>
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatNotificationTime(new Date().toISOString())}{" "}
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-20" />
              <p>Không có thông báo nào</p>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href="/notifications">Xem tất cả thông báo</Link>
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
