"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, Plus, CheckCircle, XCircle, Clock, Trash, Menu, LogOut } from 'lucide-react'
import { BACKEND_URL } from "@/lib/utils"
import DeleteConfirmationDialog from "./DeleteConfirmationDialog"

interface WebsiteTick {
  id: string;
  response_time_ms: number;
  status: "Up" | "Down";
  createdAt: string;
}

interface Website {
  id: string;
  url: string;
  ticks: WebsiteTick[];
  status: "up" | "down" | "checking";
  responseTime: number;
  lastChecked: string;
}

type DashboardProps = {
  onSignOut?: () => void;
  onDeleteAccount?: () => void;
  isDeletingAccount?: boolean;
};

export default function DashboardPage({ onSignOut, onDeleteAccount, isDeletingAccount }: DashboardProps) {
  const [websites, setWebsites] = useState<Website[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [newUrl, setNewUrl] = useState("")

  const fetchWebsites = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      const res = await axios.get(`${BACKEND_URL}/websites`, { headers: { Authorization: token } })

      interface ApiWebsite {
        id: string;
        url: string;
        ticks: Array<{ id: string; response_time_ms: number; status: 'Up' | 'Down'; createdAt: string }>;
      }

      const fetched: Website[] = res.data.websites.map((w: ApiWebsite) => ({
        id: w.id,
        url: w.url,
        ticks: w.ticks,
        status: w.ticks[0] ? (w.ticks[0].status === "Up" ? "up" : "down") : "checking",
        responseTime: w.ticks[0]?.response_time_ms || 0,
        lastChecked: w.ticks[0]?.createdAt || new Date().toISOString()
      }))

      setWebsites(fetched)
    } catch (err) {
      console.error("Failed to fetch websites", err)
    }
  }

  const handleAddWebsite = async (url: string) => {
    const token = localStorage.getItem("token")
    if (!token || !url.trim()) return

    try {
      await axios.post(`${BACKEND_URL}/website`, { url }, { headers: { Authorization: token } })
      setIsModalOpen(false)
      setNewUrl("")
      fetchWebsites()
    } catch (err) {
      console.error("Failed to add website", err)
    }
  }

  useEffect(() => {
    fetchWebsites();
    const interval = setInterval(fetchWebsites, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status?: string) => {
    if (status === "up") return (
      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
        <CheckCircle className="w-3 h-3 mr-1" />Up
      </Badge>
    )
    if (status === "down") return (
      <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />Down
      </Badge>
    )
    return (
      <Badge variant="outline">
        <Clock className="w-3 h-3 mr-1" />Checking...
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-3 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
            <span className="text-base font-semibold sm:text-lg">UpMonitor</span>
          </div>

          {/* Desktop actions */}
          <div className="hidden sm:flex gap-2">
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={() => setIsDeleteDialogOpen(true)}
              disabled={isDeletingAccount}
            >
              <Trash className="w-4 h-4 text-red-500" />
            </Button>
            <Button
              className="cursor-pointer"
              variant="ghost"
              size="icon"
              onClick={onSignOut}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="sm:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%] max-w-sm rounded-xl p-4">
                <DialogTitle className="text-base font-semibold">Menu</DialogTitle>
                <DialogDescription className="sr-only">
                  Quick navigation options for your dashboard.
                </DialogDescription>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  disabled={isDeletingAccount}
                >
                  <Trash className="w-4 h-4 mr-2 text-red-500" /> Delete Account
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={onSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Delete account dialog */}
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
          onDeleteAccount?.();
        }}
        title="Delete Account"
        description="This action is irreversible. Deleting your account will remove all your websites and monitoring history."
      />

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base sm:text-lg">Monitored Websites</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Manage and monitor your websites
              </CardDescription>
            </div>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="cursor-pointer w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" /> Add
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogTitle>Add New Website</DialogTitle>
                <DialogDescription>Monitor a new website for uptime and performance.</DialogDescription>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="website-url">Website URL</Label>
                    <Input
                      id="website-url"
                      placeholder="https://example.com"
                      value={newUrl}
                      onChange={e => setNewUrl(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button className="cursor-pointer" variant="outline" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="cursor-pointer" onClick={() => handleAddWebsite(newUrl)}>
                      Add
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto rounded-md border">
              <Table className="text-sm">
                <TableHeader>
                  <TableRow>
                    <TableHead>URL</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response</TableHead>
                    <TableHead>Last Checked</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {websites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell className="max-w-[200px] truncate">{site.url}</TableCell>
                      <TableCell>{getStatusBadge(site.status)}</TableCell>
                      <TableCell>{site.status === "up" ? `${site.responseTime}ms` : "—"}</TableCell>
                      <TableCell>{new Date(site.lastChecked).toLocaleString()}</TableCell>
                      <TableCell>
                        <Button variant="secondary" size="sm" asChild className="w-full cursor-pointer">
                          <a href={`/website/${site.id}`}>View Details</a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 sm:hidden">
              {websites.map((site) => (
                <Card key={site.id} className="p-3">
                  <div className="flex justify-between items-center gap-2">
                    <span className="truncate text-sm font-medium">{site.url}</span>
                    {getStatusBadge(site.status)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {site.status === "up" ? `${site.responseTime}ms` : "—"} •{" "}
                    {new Date(site.lastChecked).toLocaleString()}
                  </div>
                  <Button variant="secondary" size="sm" asChild className="mt-3 w-full">
                    <a href={`/website/${site.id}`}>
                      View Details
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
