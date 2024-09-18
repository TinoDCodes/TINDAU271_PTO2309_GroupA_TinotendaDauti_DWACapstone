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
import { login } from "./actions";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { SignUpConfirmation } from "@/components/SignUpConfirmation";

interface Props {
  searchParams: {
    error?: string;
    signup?: string;
  };
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      formAction={login}
      disabled={pending}
      className={`${
        pending && "animate-pulse"
      } bg-[#d65db1] hover:bg-[#d65db2b8] dark:bg-[#b39cd0] dark:hover:opacity-85 lg:text-lg lg:mt-2`}
    >
      {pending ? "Logging in..." : "Log In"}
    </Button>
  );
}

export default function LoginPage({ searchParams }: Props) {
  const [loginError, setLoginError] = useState<string>("");
  const [confirmationDialogOpen, setConfirmationDialogOpen] =
    useState<boolean>(false);

  /* - updatse the error state to show an error message if the login failed
   * - shows the sign up confirmation dialog if signup = "success" in the searchParams
   */
  useEffect(() => {
    if (searchParams.error) setLoginError(searchParams.error);

    if (searchParams.signup && searchParams.signup === "success")
      setConfirmationDialogOpen(true);
  }, [searchParams]);

  /**
   * handles closing the confirmation dialog
   */
  const handleCloseConfirmationDialog = () => {
    setConfirmationDialogOpen(false);
  };

  return (
    <div className="bg-violet-50 dark:bg-black w-full h-[100vh] flex items-center justify-center">
      <SignUpConfirmation
        isOpen={confirmationDialogOpen}
        closeDialog={handleCloseConfirmationDialog}
      />
      <Card className="w-[20rem] py-4 lg:w-[26rem] lg:px-8 dark:bg-zinc-900">
        <CardHeader className="flex flex-col items-center text-center lg:mb-2">
          <CardTitle className="font-bold text-lg lg:text-2xl font-raleway">
            Log In
          </CardTitle>
          <CardDescription className="text-xs lg:text-base">
            Enter your credentials to log in to your Castify account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* ---------- ERROR MESSAGE DISPLAY ---------- */}
          {loginError && (
            <p className="text-xs lg:text-base text-red-600 my-2 text-center">
              {loginError}
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
                className="placeholder:text-zinc-300 dark:placeholder:text-zinc-500 lg:text-lg"
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
                className="placeholder:text-zinc-300 dark:placeholder:text-zinc-500 lg:text-lg"
                required
              />
            </div>

            <Submit />
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="flex items-center gap-1">
            <p className="text-xs text-zinc-500 lg:text-sm">
              Don&apos;t have an account?
            </p>
            <Link
              href="/signup"
              className="text-sm underline text-blue-600 lg:text-base"
            >
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
