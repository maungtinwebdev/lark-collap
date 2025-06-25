import React, { useState } from 'react';
import RegisterForm from '../components/RegisterForm';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);

  return (
    <>
      {!registered ? (
        <RegisterForm
          onRegister={() => setRegistered(true)}
          onSwitchToLogin={() => router.push('/')}
        />
      ) : (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-green-100 max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">Please check your email to confirm your account before logging in.</p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              onClick={() => router.push('/')}
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
} 