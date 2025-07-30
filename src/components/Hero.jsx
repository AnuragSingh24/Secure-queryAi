
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// function Hero() {
//   const navigate = useNavigate();

//   return (
//     <div className="flex flex-col items-center justify-center text-center py-24 px-4">
//       <motion.h1
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 drop-shadow-xl"
//       >
//         Natural Language Query System with RBAC
//       </motion.h1>
//       <p className="mt-6 text-lg text-blue-100 max-w-2xl">
//         Query secure data with human-like language. Enforce access. Protect SSNs. Comply with roles.
//       </p>
//       <div className="mt-10 flex gap-6">
//         <button
//           onClick={() => navigate('/auth')}
//           className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl shadow-md hover:bg-blue-200 transition"
//         >
//           Try Demo
//         </button>
//         <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition">
//           View Docs
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Hero;



// src/components/Hero.jsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col-reverse lg:flex-row items-center justify-between px-6 md:px-16 lg:px-32 py-12 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="text-center lg:text-left max-w-xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 drop-shadow-lg">
          Natural Language Query System with RBAC
        </h1>
        <p className="mt-6 text-lg text-blue-100">
          Query secure data using natural language. Enforce role-based access. Mask sensitive data like SSNs.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button
            onClick={() => navigate('/auth')}
            className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-200 transition"
          >
            Try Demo
          </button>
          <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition">
            View Docs
          </button>
        </div>
      </motion.div>

      {/* Lottie Animation Section */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full lg:w-1/2 flex justify-center mb-12 lg:mb-0"
      >
        <DotLottieReact
          src="https://lottie.host/999d03b8-54ca-4974-889f-add6d9968a76/7XYb1oLU10.lottie"
          loop
          autoplay
          className="w-[300px] md:w-[400px] lg:w-[500px]"
        />
      </motion.div>
    </section>
  );
}

export default Hero;
