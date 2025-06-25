'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import RegisterForm from '@/components/RegisterForm'

export default function RegisterPage() {
  const router = useRouter()

  const handleRegister = () => {
    router.push('/login')
  }

  return (
    <RegisterForm onRegister={handleRegister} />
  )
}
