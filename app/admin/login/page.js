'use client';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        
        router.push('/admin');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      {!user ? (
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center">Admin Login</h2>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white p-3 rounded font-semibold">
            Login
          </button>
        </form>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl">Redirecting...</p>
        </div>
      )}
    </div>
  );
}
