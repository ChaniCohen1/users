"use client";

import { useState } from "react";
import React from 'react';
import { useRouter } from "next/navigation";
import { login } from "@/app/services/login";
import { signIn } from "next-auth/react"; // Import signIn from next-auth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    try {
      const user = await login(email, password);
      if (user)
        router.push('/'); // Redirect to homepage after successful login
      else
        setError('Invalid username or password');
    } catch {
      console.error("Failed to connect");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" }); // Use next-auth's signIn with Google
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Up with Google
          </button>
        </div>
        <p className="mt-2 text-gray-700">
          Don&apos;t have an account? <a href="./signup" className="text-blue-500">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
