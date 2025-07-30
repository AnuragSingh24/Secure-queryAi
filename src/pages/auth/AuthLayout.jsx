
import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './Login';
import Signup from './Signup';

const AuthLayout = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center px-6 py-10">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white/5 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/10">

        {/* Left: Animation */}
        <div className="hidden md:flex justify-center">
          <DotLottieReact
            src="https://lottie.host/76892b8c-c917-46c6-b914-4de64e8e3411/t6slxYszay.lottie"
            loop
            autoplay
            style={{ height: '350px' }}
          />
        </div>

        {/* Right: Auth Form with Toggle */}
        <div className="w-full">
          <div className="flex justify-center gap-6 mb-8 text-lg font-semibold">
            <button
              onClick={() => setIsLogin(true)}
              className={`transition px-5 py-2 rounded-xl ${
                isLogin ? 'bg-blue-500 text-white' : 'text-blue-300 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`transition px-5 py-2 rounded-xl ${
                !isLogin ? 'bg-blue-500 text-white' : 'text-blue-300 hover:text-white'
              }`}
            >
              Signup
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              {isLogin ? <Login /> : <Signup />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
