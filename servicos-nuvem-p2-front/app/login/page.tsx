'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { login, register } from "../services/auth";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";

export default function Page() {
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState<string>("");

    const [remail, setREmail] = useState("")
    const [rusername, setRUsername] = useState("")
    const [rpassword, setRPassword] = useState("")
    const [registerError, setRegisterError] = useState<string>("");

    const [activeTab, setActiveTab] = useState<"login" | "register">("login")

    const router = useRouter();

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value)
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function handleRUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRUsername(event.target.value)
    }

    function handleREmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        setREmail(event.target.value)
    }

    function handleRPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRPassword(event.target.value)
    }

    async function handleLogin() {
        const result = await login(username, password)

        setLoginError("")

        if (result) {
    
            console.log("Cookies set!")
            console.log(result)
        
            setCookie("token", result.token, {maxAge: 60 * 60 * 24})
            setCookie("user_id", result.user_id, {maxAge: 60 * 60 * 24})
            setCookie("username", result.username, {maxAge: 60 * 60 * 24})
            redirect("/")
        } else {
            setLoginError("Username/Password incorrect")
        }

    }

    async function handleRegister() {
        
        setRegisterError("")
        
        if (remail == "" || rusername == "" || rpassword == "") {
            setRegisterError("Fill all fields")
            return
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmail = emailRegex.test(remail);

        if (!validEmail) {
            setRegisterError("Email Invalid!")
            return
        }

        const result = await register(rusername, remail, rpassword);

        if (result) {
            setActiveTab('login')
            router.refresh()
        } else {
            setRegisterError("Error when creating account")
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
                <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
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
                            {loginError && (
                                <div className="w-full flex justify-center"> 
                                    <p className="text-red-500 text-sm mt-2 font-semibold">{loginError}</p>
                                </div>

                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="register">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-username">Username</Label>
                                <Input id="new-username" type="text" onChange={(event) => handleRUsernameChange(event)}/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-email">Email</Label>
                                <Input id="new-email" placeholder="name@example.com" onChange={(event) => handleREmailChange(event)} type="email" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Password</Label>
                                <Input id="new-password" onChange={(event) => handleRPasswordChange(event)} type="password" />
                            </div>
                            <Button className="w-full" onClick={handleRegister}>Create Account</Button>
                            {registerError && (
                                <div className="w-full flex justify-center"> 
                                    <p className="text-red-500 text-sm mt-2 font-semibold">{registerError}</p>
                                </div>

                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}