'use server'

import { NextResponse } from "next/server";

export async function login(email: string, password: string) {
    
    try {
        
        const response = await fetch('http://localhost:8080/api/users/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        
        const data = await response.json()
    
        if (!response.ok) {
            return NextResponse.json({ error: data.error }, { status: response.status });
        }
    
        return data
    
    } catch (error) {
        console.log("Error when Login:", error)
    }
}

export async function register(username: string, email: string, password: string) {
    
    try {
        
        const response = await fetch('http://localhost:8080/api/users/register', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            })
        });
        
        const data = await response.json()
    
        if (!response.ok) {
            return NextResponse.json({ error: data.error }, { status: response.status });
        }
    
        return data
    
    } catch (error) {
        console.log("Error when register:", error)
    }
}