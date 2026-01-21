'use client'; // This component needs interactivity (clicking)

import { useState } from 'react';
import { subscribeEmail } from '../lib/api';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await subscribeEmail(email);
      if (res.message) {
        setStatus('success');
        setMessage(res.message);
        setEmail(''); // Clear the input
      } else {
        setStatus('error');
        setMessage("Something went wrong.");
      }
    } catch (err) {
      setStatus('error');
      setMessage("Server offline.");
    }
  }

  return (
    <div className="bg-gray-50 p-8 rounded-lg text-center my-12">
      <h3 className="text-xl font-serif font-bold mb-2">Join the Reader List</h3>
      <p className="text-sm text-gray-500 mb-6">Get notified when new stories drop.</p>

      {status === 'success' ? (
        <div className="text-green-600 font-medium py-2">{message}</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 justify-center max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="your@email.com"
            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-black transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition disabled:opacity-50"
          >
            {status === 'loading' ? '...' : 'Join'}
          </button>
        </form>
      )}
      
      {status === 'error' && <p className="text-red-500 text-xs mt-3">{message}</p>}
    </div>
  );
}