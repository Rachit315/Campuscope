"use client"

import { useState } from "react"

interface DashboardProfileProps {
  user?: {
    id: string
    name: string
    email: string
    createdAt: Date
  }
}

export default function DashboardProfile({ user: initialUser }: DashboardProfileProps) {
  const userData = {
    id: "123",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: new Date(),
  }

  const [user, setUser] = useState({
    ...userData,
    name: initialUser?.name || userData.name,
    email: initialUser?.email || userData.email,
  })

  return (
    <div>
      <h1>Dashboard Profile</h1>
      <p>ID: {user.id}</p>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Created At: {user.createdAt.toLocaleDateString()}</p>
    </div>
  )
}
