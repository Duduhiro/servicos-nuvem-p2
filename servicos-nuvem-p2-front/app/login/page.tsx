'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { login } from "../services/auth";
import { useState } from "react";
import { redirect } from "next/navigation";
import { setCookie } from "cookies-next/client";

export default function Page() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    async function handleLogin() {
        const result = await login(username, password)

        if (result) {
    
            console.log("Cookies set!")
            console.log(result)
        
            setCookie("token", result.token, {maxAge: 60 * 60 * 24})
            setCookie("user_id", result.user_id, {maxAge: 60 * 60 * 24})
            setCookie("username", result.username, {maxAge: 60 * 60 * 24})
            redirect("/")
        } else {
            console.log('fuck')
        }

    }

    return (
        <div className="flex h-screen w-screen flex-col items-center justify-center">
            <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
                <Button variant="ghost" className="gap-1">
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </Button>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Welcome to WannaWatch</h1>
                    <p className="text-sm text-muted-foreground">Sign in to your account or create a new one</p>
                </div>
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" onChange={(event) => handleUsernameChange(event)} placeholder="name@example.com" type="email" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" onChange={(event) => handlePasswordChange(event)} type="password" />
                            </div>
                            <Button className="w-full" onClick={handleLogin}>Sign In</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="register">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-email">Email</Label>
                                <Input id="new-email" placeholder="name@example.com" type="email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Password</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                            <Button className="w-full">Create Account</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}