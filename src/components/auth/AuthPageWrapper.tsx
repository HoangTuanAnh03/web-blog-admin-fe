"use client"

import type React from "react"
import Link from "next/link"
// import { PenTool } from 'lucide-react'

interface AuthPageWrapperProps {
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode | null
}

export function AuthPageWrapper({ title, description, children, footer }: AuthPageWrapperProps) {
  return (
    <div className="min-h-screen bg-background">

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4 tracking-tight">{title}</h1>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed font-medium">{description}</p>
          </div>

          <div className="bg-card border rounded-lg shadow-sm p-8">{children}</div>

          {footer && <div className="mt-8 text-center">{footer}</div>}
        </div>
      </main>
    </div>
  )
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  )
}
