'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { supabase } from "@/lib/supabaseClient"
import { toast } from 'react-toastify'

export default function UpdatePasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // If no session, check for hash parameters
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        if (hashParams.get('error')) {
          setError('The password reset link has expired or is invalid. Please request a new one.')
        }
      } else {
        setIsAuthenticated(true)
      }
    }

    checkSession()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      toast.success('Password updated successfully!')
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error updating password')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated && error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button 
              className="w-full mt-4"
              onClick={() => router.push('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                minLength={6}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                minLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}