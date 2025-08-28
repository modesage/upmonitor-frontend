"use client"

import { useCallback, useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, ArrowLeft, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react'
import { BACKEND_URL } from "@/lib/utils"
import axios from "axios"

interface WebsiteTick {
    id: string
    response_time_ms: number
    status: "Up" | "Down" | "Checking"
    createdAt: string
}

interface WebsiteDetails {
    id: string
    url: string
    ticks: WebsiteTick[]
    createdAt: string
}

export default function WebsitePage() {
    const params = useParams()
    const router = useRouter()
    const [website, setWebsite] = useState<WebsiteDetails | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchWebsiteDetails = useCallback(async () => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.push("/signin")
            return
        }

        try {
            const websiteId = params.websiteId as string
            if (!websiteId) {
                console.error('No website ID in params')
                return
            }

            const res = await axios.get(`${BACKEND_URL}/status/${websiteId}`, {
                headers: { Authorization: token }
            })

            if (!res.data) {
                throw new Error("Empty response from server")
            }

            setWebsite({
                id: res.data.id,
                url: res.data.url,
                ticks: res.data.ticks || [],
                createdAt: res.data.createdAt || new Date().toISOString()
            })
        } catch {
            console.error("Failed to fetch website details")
        } finally {
            setLoading(false)
        }
    }, [params.websiteId, router])

    useEffect(() => {
        fetchWebsiteDetails()
        const interval = setInterval(fetchWebsiteDetails, 60 * 1000) //every minute fetch website details
        return () => clearInterval(interval)
    }, [fetchWebsiteDetails])

    const getStatusBadge = (status?: string) => {
        if (status === "Up") {
          return (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              <CheckCircle className="w-3 h-3 mr-1" />
              Up
            </Badge>
          )
        } else if (status === "Down") {
          return (
            <Badge variant="destructive">
              <XCircle className="w-3 h-3 mr-1" />
              Down
            </Badge>
          )
        } else {
          return (
            <Badge variant="outline">
              <Clock className="w-3 h-3 mr-1" />
              Checking...
            </Badge>
          )
        }
      }

    const getTickIndicator = (status: "Up" | "Down" | "Checking", index: number) => (
        <div
            key={index}
            className={`w-4 h-8 rounded-sm ${status === "Up" ? 'bg-green-500 dark:bg-green-600' : 'bg-red-500 dark:bg-red-600'}`}
            title={`${status} - ${new Date(website?.ticks[index]?.createdAt || '').toLocaleString()}`}
        />
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Clock className="w-6 h-6 animate-spin" />
                    <span>Loading website details...</span>
                </div>
            </div>
        )
    }

    if (!website) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Website not found</h1>
                    <Button onClick={() => router.push("/dashboard")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        )
    }

    const currentStatus = website.ticks[0]?.status || "Checking"
    const currentResponseTime = website.ticks[0]?.response_time_ms || 0
    const lastChecked = website.ticks[0]?.createdAt || website.createdAt
    const last10Ticks = website.ticks.slice(0, 10)

    const upTicks = last10Ticks.filter(tick => tick.status === "Up").length
    const uptimePercentage = last10Ticks.length ? (upTicks / last10Ticks.length) * 100 : 0

    return (
        <div className="min-h-screen bg-background">
            <header className="border-b">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Button className="cursor-pointer" variant="ghost" onClick={() => router.push("/dashboard")}>
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Dashboard
                        </Button>
                        <div className="flex items-center space-x-2">
                            <Globe className="h-6 w-6 text-primary" />
                            <span className="text-xl font-bold">Website Details</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl">{website.url}</CardTitle>
                            </div>
                            <div className="flex items-center space-x-4">
                                {getStatusBadge(currentStatus)}
                                <Button variant="outline" size="sm" asChild>
                                    <a href={website.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        Visit Site
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    {[
                        {
                            title: "Status",
                            icon: currentStatus === "Up"
                                ? <CheckCircle className="h-4 w-4 text-green-500" />
                                : currentStatus === "Down"
                                ? <XCircle className="h-4 w-4 text-red-500" />
                                : <Clock className="h-4 w-4 text-muted-foreground" />,
                            value: currentStatus,
                            color: currentStatus === "Up" ? "text-green-600" : currentStatus === "Down" ? "text-red-600" : "text-muted-foreground"
                        },
                        {
                            title: "Response Time",
                            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
                            value: currentStatus === "Up" ? `${currentResponseTime}ms` : "—"
                        },
                        {
                            title: "Uptime (Last 10)",
                            icon: <Globe className="h-4 w-4 text-muted-foreground" />,
                            value: `${uptimePercentage.toFixed(1)}%`
                        },
                        {
                            title: "Last Checked",
                            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
                            value: new Date(lastChecked).toLocaleString()
                        }
                    ].map((stat, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                {stat.icon}
                            </CardHeader>
                            <CardContent>
                                <div className={`text-2xl font-bold ${stat.color || ""}`}>{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Status History</CardTitle>
                        <CardDescription>
                            Last 10 status checks (newest to oldest)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium w-16">Status:</span>
                                <div className="flex space-x-1">
                                    {last10Ticks.map((tick, index) =>
                                        getTickIndicator(tick.status, index)
                                    )}
                                </div>
                                <div className="flex items-center space-x-4 ml-4">
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                                        <span className="text-xs text-muted-foreground">Up</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                                        <span className="text-xs text-muted-foreground">Down</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Detailed History</h4>
                                <div className="space-y-1">
                                    {last10Ticks.map((tick) => (
                                        <div key={tick.id} className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50">
                                            <div className="flex items-center space-x-3">
                                                {tick.status === "Up" ? (
                                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <XCircle className="w-4 h-4 text-red-500" />
                                                )}
                                                <span className="text-sm font-medium">{tick.status}</span>
                                            </div>
                                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                                <span>{tick.status === "Up" ? `${tick.response_time_ms}ms` : "—"}</span>
                                                <span>{new Date(tick.createdAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
