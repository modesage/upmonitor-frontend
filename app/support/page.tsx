"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SupportPage() {
    const LAST_UPDATED = "August 31, 2025";
    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16 bg-background">
            <Card className="w-full max-w-3xl border rounded-2xl shadow-sm">
                <CardContent className="p-6 sm:p-10 space-y-8">

                    {/* Back to Home Button */}
                    <div className="flex justify-end">
                        <Link href="/" passHref>
                            <Button className="cursor-pointer w-full sm:w-auto">Back to Home</Button>
                        </Link>
                    </div>

                    {/* Page Title */}
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl font-bold">Support</h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Thank you for checking out <span className="font-medium">UpMonitor</span>.
                            This is a personal project, so currently dedicated support services are <strong>not available</strong>.
                            You can explore the full source code on GitHub:
                        </p>
                        <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground space-y-1 mt-2">
                            <li>
                                Frontend: <Link href="https://github.com/modesage/upmonitor-frontend" target="_blank" className="text-primary underline">GitHub Repository</Link>
                            </li>
                            <li>
                                Backend: <Link href="https://github.com/modesage/upmonitor-backend" target="_blank" className="text-primary underline">GitHub Repository</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Project Overview */}
                    <section className="space-y-2">
                        <h2 className="text-lg sm:text-xl font-semibold">About This Project</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            UpMonitor demonstrates a website uptime monitoring dashboard with features like:
                        </p>
                        <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground mt-2 space-y-1">
                            <li>Real-time status checks for websites</li>
                            <li>User authentication and account management</li>
                            <li>Historical uptime tracking and response time analytics</li>
                        </ul>
                        <p className="text-sm sm:text-base text-muted-foreground mt-2">
                            Note: Currently there is no live support or subscription system implemented.
                        </p>
                    </section>

                    {/* Footer Note */}
                    <p className="text-xs sm:text-sm text-muted-foreground mt-4 text-center">
                        Last updated: {LAST_UPDATED}
                    </p>

                </CardContent>
            </Card>
        </div>
    )
}
