


// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Hero from './components/Hero';
// import Features from './components/Features';
// import Footer from './components/Footer';
// import Intro3D from './components/Intro3D';
// import AuthLayout from './pages/auth/AuthLayout'; // login/signup wrapper

// function App() {
//   const [showIntro, setShowIntro] = useState(true);

//   return (
//     <Router>
//       {showIntro ? (
//         <Intro3D onFinish={() => setShowIntro(false)} />
//       ) : (
//         <Routes>
//           {/* Landing Page */}
//           <Route
//             path="/"
//             element={
//               <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-screen text-white">
//                 <Hero />
//                 <Features />
//                 <Footer />
//               </div>
//             }
//           />

//           {/* Auth Pages */}
//           <Route path="/auth/*" element={<AuthLayout />} />

//           {/* You can add more pages here in future like Dashboard, Profile, etc. */}
//         </Routes>
//       )}
//     </Router>
//   );
// }

// export default App;



import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import Intro3D from './components/Intro3D';
import AuthLayout from './pages/auth/AuthLayout'; // login/signup wrapper
import Dashboard from './pages/Dashboard'; 
import AuditLogPage from './pages/AuditLogPage';

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Router>
      {showIntro ? (
        <Intro3D onFinish={() => setShowIntro(false)} />
      ) : (
        <Routes>
          {/* Landing Page */}
          <Route
            path="/"
            element={
              <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] min-h-screen text-white">
                <Hero />
                <Features />
                <Footer />
              </div>
            }
          />

          {/* Auth Pages */}
          <Route path="/auth/*" element={<AuthLayout />} />

          {/*  Dashboard Page */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/audit-log" element={<AuditLogPage />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
