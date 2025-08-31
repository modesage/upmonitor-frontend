"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Globe, Zap, LayoutDashboard, MapPin, Clock, Menu, X } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogTitle, DialogDescription, } from "@/components/ui/dialog"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">UpMonitor</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              href="#features"
              className="text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Button asChild variant="ghost" size="sm">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>

          {/* Mobile Nav (Dialog) */}
          <div className="md:hidden">
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-2 rounded-md hover:bg-muted">
                  <Menu className="h-6 w-6" />
                </button>
              </DialogTrigger>
              <DialogContent
                className="backdrop-blur-sm bg-background/95 max-w-xs rounded-2xl p-6 flex flex-col gap-4"
                showCloseButton={false}
              >
                <div className="flex justify-between items-center mb-4">
                  <DialogTitle className="font-semibold text-lg">Menu</DialogTitle>
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="w-5 h-5" />
                    </Button>
                  </DialogClose>
                </div>

                {/* Optional for accessibility */}
                <DialogDescription className="sr-only">
                  Navigate between authentication options
                </DialogDescription>

                <Button asChild variant="ghost" className="w-full">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            99.9% Uptime Monitoring
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Monitor your websites with ease
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Simple, reliable uptime and performance monitoring trusted by teams worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/signin">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Uptime checks, global monitoring, and a simple dashboard — no extra noise.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: CheckCircle, title: "Uptime Monitoring", desc: "Stay informed with reliable uptime tracking." },
              { icon: Clock, title: "Real-Time Checks", desc: "See status changes as they happen." },
              { icon: LayoutDashboard, title: "Simple Dashboard", desc: "All key metrics in one clean view." },
              { icon: MapPin, title: "Global Regions", desc: "Monitor from multiple worldwide locations." },
              { icon: Globe, title: "Worldwide Coverage", desc: "Accurate checks across continents." },
              { icon: Zap, title: "Fast Setup", desc: "Add a site and start monitoring instantly." },
            ].map((f, i) => (
              <Card key={i} className="border rounded-xl shadow-sm">
                <CardContent className="p-6 text-center">
                  <f.icon className="h-10 w-10 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="flex items-center justify-center space-x-2 mb-4 md:mb-0">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">UpMonitor</span>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm">
              <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground">
                Support
              </Link>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-muted-foreground space-y-1">
            <p>&copy; {new Date().getFullYear()} UpMonitor. All rights reserved.</p>
            <p>
              View the full project on{" "}
              <Link
                href="https://github.com/modesage/upmonitor-frontend"
                target="_blank"
                className="text-primary underline"
              >
                GitHub
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
