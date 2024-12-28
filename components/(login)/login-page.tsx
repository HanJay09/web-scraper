'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const supabaseUrl = 'https://otdhyixbxugmikkfbbkr.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90ZGh5aXhieHVnbWlra2ZiYmtyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MDk0OTgsImV4cCI6MjA0NDE4NTQ5OH0.y6qAW2wx2dMA6CJNxVlo9YirWBze6zCyJXuchjd3fD8';
  const supabase = createClient(supabaseUrl, supabaseKey);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = (document.getElementById("emailInput") as HTMLInputElement).value.trim().toLowerCase();
    const password = (document.getElementById("passwordInput") as HTMLInputElement).value;

    console.log("emailInput", email);
    console.log("passwordInput", password);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        if (error.message === "Invalid login credentials") {
          toast.error("Invalid email or password.");
        } else if (error.message === "Email not confirmed") {
          toast.error("Please confirm your email before logging in.");
        } else {
          toast.error(`Login failed: ${error.message}`);
        }
      } else {
        console.log("User signed in:", data);
        toast.success("Login successful!");
        // Redirect to the dashboard or desired page
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Log in</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailInput">Email</Label>
                <Input
                  id="emailInput"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordInput">Password</Label>
                <div className="relative">
                  <Input
                    id="passwordInput"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">Log In</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              Don’t have an account?{' '}
              <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href="/signup">
                Sign up
              </Link>
            </div>
            <div className="text-sm text-center">
              <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href="/forgot-password">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
