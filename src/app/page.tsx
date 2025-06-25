'use client';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginForm onLogin={() => router.push('/dashboard')} />
    </div>
  );
}
