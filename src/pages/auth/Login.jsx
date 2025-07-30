
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        'https://secure-query.onrender.com/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      // ✅ Save token & user info to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setMessage({ type: 'success', text: 'Login successful!' });

      // ✅ Redirect based on user role
      if (user.role === 'ADMIN') {
        navigate('/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Login failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6 max-w-md mx-auto bg-gray-900 p-6 rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4">Login to your account</h2>

      <input
        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        className="w-full p-3 bg-gray-800 rounded-lg border border-gray-700"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      {message && (
        <p className={`mt-3 text-sm ${message.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
          {message.text}
        </p>
      )}
    </form>
  );
};

export default Login;
