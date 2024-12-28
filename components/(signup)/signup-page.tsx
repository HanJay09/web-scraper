'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient"; // Adjusted import if you store supabase client in a separate file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const handleSignup = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      // Sign up user with email and password
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created successfully! Please verify your email.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
  
        // Set full name as display name after email verification
        const checkEmailVerified = setInterval(async () => {
          const { data: userData, error: getUserError } = await supabase.auth.getUser();
  
          if (getUserError) {
            toast.error(getUserError.message);
            clearInterval(checkEmailVerified); // Stop checking in case of error
            return;
          }
  
          const user = userData?.user;
  
          if (user?.email_confirmed_at) {
            // Update display name after email is verified
            const { error: updateError } = await supabase.auth.updateUser({
              data: { full_name: name }, // This sets the full name as the display name
            });
  
            if (updateError) {
              toast.error("Failed to update display name.");
            } else {
              toast.success("Display name updated!");
            }
            clearInterval(checkEmailVerified); // Stop checking after updating
          }
        }, 5000); // Check every 5 seconds for email verification
  
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500); // Wait 1.5 seconds before redirecting
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };
  
  
  

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Enter your details below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-indigo-600 hover:underline dark:text-indigo-400">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/policy" className="text-indigo-600 hover:underline dark:text-indigo-400">
                    privacy policy
                  </Link>
                </label>
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link className="text-indigo-600 hover:underline dark:text-indigo-400" href="/login">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}
