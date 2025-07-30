import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [stage, setStage] = useState('signup'); // or 'verify'
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        'https://secure-query.onrender.com/api/auth/register',
        form,
        { withCredentials: true }
      );
      setMessage({ type: 'success', text: res.data.message });
      setStage('verify'); // switch to OTP verification
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Signup failed. Try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await axios.post(
        'https://secure-query.onrender.com/api/auth/verify-otp',
        { email: form.email, otp },
        { withCredentials: true }
      );
      setMessage({ type: 'success', text: res.data.message });

      // Store token if returned
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      //bug - 2
      // // Redirect to dashboard
      // navigate('/');
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'OTP verification failed.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm p-6 bg-gray-800 rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-white">
        {stage === 'signup' ? 'Sign Up' : 'Verify OTP'}
      </h2>

      {stage === 'signup' ? (
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}

      {message && (
        <p
          className={`text-sm ${
            message.type === 'error' ? 'text-red-400' : 'text-green-400'
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default Signup;
