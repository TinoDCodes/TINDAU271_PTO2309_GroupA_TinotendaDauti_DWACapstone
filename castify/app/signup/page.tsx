"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signup } from "./actions";
import { useEffect, useState } from "react";

interface Props {
  searchParams: {
    error?: string;
  };
}

export default function SignUpPage({ searchParams }: Props) {
  const [signUpError, setSignUpError] = useState<string>("");

  useEffect(() => {
    if (searchParams.error) setSignUpError(searchParams.error);
  }, [searchParams]);

  return (
    <div className="bg-violet-50 w-full h-[100vh] flex items-center justify-center">
      <Card className="w-[20rem] py-4 lg:w-[26rem] lg:px-8">
        <CardHeader className="flex flex-col items-center text-center lg:mb-2">
          <CardTitle className="font-bold text-lg lg:text-2xl font-raleway">
            Welcome!
          </CardTitle>
          <CardDescription className="text-xs lg:text-base">
            Enter your credentials to create a Castify account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* ---------- ERROR MESSAGE DISPLAY ---------- */}
          {signUpError && (
            <p className="text-xs lg:text-base text-red-600 my-2 text-center">
              {signUpError}
            </p>
          )}

          <form className="flex flex-col gap-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email" className="lg:text-lg">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="johndoe@example.com"
                className="placeholder:text-zinc-300 lg:text-lg"
                required
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password" className="lg:text-lg">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="************"
                className="placeholder:text-zinc-300 lg:text-lg"
                required
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="password2" className="lg:text-lg">
                Confirm Password
              </Label>
              <Input
                type="password"
                id="password2"
                name="password2"
                placeholder="************"
                className="placeholder:text-zinc-300 lg:text-lg"
                required
              />
            </div>

            <Button
              formAction={signup}
              className="bg-[#d65db1] hover:bg-[#d65db2b8] lg:text-lg lg:mt-2"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex items-center gap-1">
            <p className="text-xs text-zinc-500 lg:text-sm">
              Already have an account?
            </p>
            <Link
              href="/login"
              className="text-sm underline text-blue-600 lg:text-base"
            >
              Log In
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
