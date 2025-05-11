'use server'

export async function login(email: string, password: string) {
    try {
        
        console.log(email)
        console.log(password)

        const response = await fetch('http://localhost:8080/api/users/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        });
        
        const data = await response.json()
        return data
    
    } catch (error) {
        console.log("Error when Login:", error)
    }
}