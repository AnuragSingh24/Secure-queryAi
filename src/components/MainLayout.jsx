// MainLayout.jsx
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const MainLayout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <DotLottieReact
          src="https://lottie.host/c4dfef53-4b88-4b90-a743-b013524b6231/YlMzWl0g1J.lottie"
          autoplay
          loop
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MainLayout;
