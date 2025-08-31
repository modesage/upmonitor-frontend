"use client"

import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Eye, EyeOff } from 'lucide-react'
import { BACKEND_URL } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!formData.username || !formData.password) {
      setError('Please enter both fields.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signin`, {
        username: formData.username,
        password: formData.password
      });
      setSuccess('Signed in! Redirecting...');
      localStorage.setItem("token", response.data.jwt);
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Sign in failed. Try again.');
      } else {
        setError('Sign in failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Content */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12 bg-muted/50">
        <div className="max-w-md text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
            <Globe className="h-7 w-7 text-primary" />
            <span className="text-xl sm:text-2xl font-bold">UpMonitor</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Welcome back
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
            Monitor your websites with confidence.  
            Sign in to access your dashboard and keep track of uptime.
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm sm:text-base text-muted-foreground">99.9% uptime guarantee</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm sm:text-base text-muted-foreground">Real-time monitoring</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm sm:text-base text-muted-foreground">Instant alerts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl">Sign In</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Error / Success */}
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-600 text-sm">{success}</div>}

              {/* Submit */}
              <Button className="w-full cursor-pointer" size="lg" type="submit" disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </Button>

              {/* Footer */}
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
