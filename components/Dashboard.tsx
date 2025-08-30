"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Globe, Plus, CheckCircle, XCircle, Clock, Eye, Trash } from 'lucide-react'
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
      const res = await axios.get(`${BACKEND_URL}/websites`, {
        headers: { Authorization: token }
      })

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
        lastChecked: w.ticks[0]?.createdAt || new Date().toLocaleString()
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
    if (status === "up") return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"><CheckCircle className="w-3 h-3 mr-1"/>Up</Badge>
    if (status === "down") return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1"/>Down</Badge>
    return <Badge variant="outline"><Clock className="w-3 h-3 mr-1"/>Checking...</Badge>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">UpMonitor</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="destructive" size="sm" onClick={() => setIsDeleteDialogOpen(true)} className="cursor-pointer flex items-center space-x-1">
              <Trash className="w-4 h-4"/>
              <span>Delete Account</span>
            </Button>
            <Button variant="destructive" size="sm" onClick={onSignOut} className="cursor-pointer">
              Logout
            </Button>
          </div>
        </div>
      </header>

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

      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monitored Websites</CardTitle>
                <CardDescription>
                  Manage and monitor all your websites in one place
                </CardDescription>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Website
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <CardHeader>
                    <CardTitle>Add New Website</CardTitle>
                    <CardDescription>Add a new website to monitor its uptime and performance.</CardDescription>
                  </CardHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="website-url">Website URL</Label>
                      <Input id="website-url" placeholder="https://example.com" value={newUrl} onChange={e => setNewUrl(e.target.value)} />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button className="cursor-pointer" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                      <Button className="cursor-pointer" onClick={() => handleAddWebsite(newUrl)}>Add Website</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Response Time</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {websites.map((website) => (
                  <TableRow key={website.id}>
                    <TableCell className="text-sm text-muted-foreground">{website.url}</TableCell>
                    <TableCell>{getStatusBadge(website.status)}</TableCell>
                    <TableCell>{website.status === "up" ? `${website.responseTime}ms` : "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(website.lastChecked).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/website/${website.id}`}><Eye className="w-4 h-4" /></a>
                      </Button>
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
