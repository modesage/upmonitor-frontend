"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, CheckCircle } from 'lucide-react'
import axios from "axios"
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
    <div className="min-h-screen flex">
      {/* Left Side - Content */}
      <div className="flex-1 flex items-center justify-center p-8 bg-muted/50">
        <div className="max-w-md">
          <div className="flex items-center space-x-2 mb-8">
            <Globe className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">UpMonitor</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Start monitoring today
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands who trust UpMonitor to track website uptime, status, and performance.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">Monitor websites for free</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">30-second check intervals</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm">No credit card required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Get started with your free monitoring account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
          className="absolute inset-y-0 right-2 cursor-pointer flex items-center px-2 text-gray-500 focus:outline-none"
          tabIndex={-1}
          onClick={() => setShowPassword((v) => !v)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.22.413 4.563 1.125M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.386-.564 2.642-1.475 3.675M19.875 19.875L4.125 4.125" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9 0c0 3-4 7-9 7s-9-4-9-7 4-7 9-7 9 4 9 7z" /></svg>
          )}
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
          className="absolute inset-y-0 right-2 cursor-pointer flex items-center px-2 text-gray-500 focus:outline-none"
          tabIndex={-1}
          onClick={() => setShowConfirmPassword((v) => !v)}
          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
        >
          {showConfirmPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.22.413 4.563 1.125M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.386-.564 2.642-1.475 3.675M19.875 19.875L4.125 4.125" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm9 0c0 3-4 7-9 7s-9-4-9-7 4-7 9-7 9 4 9 7z" /></svg>
          )}
        </button>
      </div>
    </div>
    {error && <div className="text-red-500 text-sm">{error}</div>}
    {success && <div className="text-green-600 text-sm">{success}</div>}
    <Button className="w-full cursor-pointer" size="lg" type="submit" disabled={loading}>
      {loading ? "Creating..." : "Create Account"}
    </Button>
    <div className="text-center text-sm text-muted-foreground">
      Already have an account?{" "}
      <Link href="/signin" className="text-primary hover:underline">
        Sign in
      </Link>
    </div>
  </form>
</CardContent>
        </Card>
      </div>
    </div>
  )
}
