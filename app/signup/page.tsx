"use client"

import Link from "next/link"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, CheckCircle, Eye, EyeOff } from 'lucide-react'
import { BACKEND_URL } from "@/lib/utils"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/user/signup`, {
        username: formData.username,
        password: formData.password
      });
      setSuccess('Account created! Redirecting...');
      setTimeout(() => router.push('/signin'), 1500);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Signup failed. Try again.');
      } else {
        setError('Signup failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12 bg-muted/50">
        <div className="max-w-md text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-2 mb-6">
            <Globe className="h-7 w-7 text-primary" />
            <span className="text-xl sm:text-2xl font-bold">UpMonitor</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
            Start monitoring today
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
            Join thousands who trust UpMonitor to track website uptime, status, and performance.
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm sm:text-base">Monitor Websites for Free</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm sm:text-base">Receive Timely Updates</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm sm:text-base">No Credit Card Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-xl sm:text-2xl">Create Account</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Get started with your free monitoring account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>


              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <Button className="w-full cursor-pointer" size="lg" type="submit" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/signin" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
