"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"

interface HtmlPreviewModalProps {
    htmlContent: string
    triggerText?: string
}

export default function HtmlPreviewModal({ htmlContent }: HtmlPreviewModalProps) {
    const [open, setOpen] = useState(true)

    useEffect(() => {
        setOpen(true)
    }, [htmlContent])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Content of Post</DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[75vh] px-1">
                    <div
                        className="prose dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}