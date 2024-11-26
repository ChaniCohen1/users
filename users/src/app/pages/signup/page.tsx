"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';  // ייבוא פונקציית signIn מ-NextAuth
import { signup } from '@/app/services/signup';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("before");

    const response = await signup(username, email, password);
    console.log("after");

    if (response) {
      router.push('/'); // מעבר לדף הבית לאחר הרשמה מוצלחת
      console.log("sucsses");

    } else {
      console.error('Failed to sign up');
    }
  };

  const handleGoogleSignIn = async () => {
    // ניסיון להתחבר עם גוגל
    const res = await signIn('google', { redirect: false });

    // אם ההתחברות הצליחה, נבצע הפנייה לדף הבית
    if (res?.ok) {
      router.push('/'); // הפנייה לדף הבית
    } else {
      console.error('Google sign-in failed');
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
            onClick={handleGoogleSignIn}
            className="w-full px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Up with Google
          </button>
        </div>
        <p className="mt-2 text-gray-700">
          Don&apos;t have an account? <a href="./login" className="text-blue-500">Login</a>
        </p>

      </div>
    </div>
  );
};

export default SignUp;
