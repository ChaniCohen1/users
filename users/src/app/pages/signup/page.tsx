"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/services/signup";
import SignUpForm from "@/app/components/SignUpForm";
import GoogleSignInButton from "@/app/components/GoogleButton";

const SignUp = () => {
  const router = useRouter();

  const handleSignUp = async (fullName: string, email: string, password: string, age: string, address: string) => {
    console.log("before");

    const response = await signup(fullName, email, password, parseInt(age), address);
    console.log("after");

    if (response) {
      router.push("/"); // מעבר לדף הבית לאחר הרשמה מוצלחת
      console.log("success");
    } else {
      console.error("Failed to sign up");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <SignUpForm onSubmit={handleSignUp} />
        <div className="text-center">
          <GoogleSignInButton />
        </div>
        <p className="mt-2 text-gray-700">
          Don&apos;t have an account? <a href="./login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
