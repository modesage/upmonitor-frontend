"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LegalLayout({ children }: { children: React.ReactNode }) {
    const LAST_UPDATED = "August 31, 2025";
    return (
        <div className="min-h-screen flex items-center justify-center px-3 sm:px-6 py-10 sm:py-16">
            <Card className="w-full max-w-3xl border rounded-2xl shadow-sm p-5 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-lg sm:text-xl font-bold">Legal</h1>
                    <Link href="/" passHref>
                        <Button className="cursor-pointer w-full sm:w-auto">Back to Home</Button>
                    </Link>
                </div>

                {/* Content */}
                <div className="space-y-6">{children}</div>

                {/* Footer */}
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-6 text-center">
                    Last updated: {LAST_UPDATED}
                </p>
            </Card>
        </div>
    )
}
