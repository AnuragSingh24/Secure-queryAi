import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from '../components/Hero';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import VerifyOTP from '../pages/VerifyOTP';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/verify-otp" element={<VerifyOTP />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
