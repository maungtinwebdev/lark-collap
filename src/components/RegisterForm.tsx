import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const RegisterForm = ({ onRegister, onSwitchToLogin }: { onRegister?: () => void; onSwitchToLogin?: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      if (onRegister) onRegister();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white py-8 px-2">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-green-100 relative"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 rounded-full p-3 mb-2">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2m12-10a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h2 className="text-2xl font-extrabold text-green-700 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started with Lark Tasks</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition mb-1"
            required
            autoComplete="email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition mb-1"
            required
            autoComplete="new-password"
          />
        </div>
        {error && <div className="text-red-500 mb-3 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 mb-3 text-sm text-center">Registration successful! Please check your email to confirm your account.</div>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold p-3 rounded-lg shadow hover:from-green-600 hover:to-green-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-6 text-center text-gray-500 text-sm">
          Already have an account?{' '}
          <button
            type="button"
            className="text-green-600 hover:underline font-semibold"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm; 