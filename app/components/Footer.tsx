// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-custom-black text-white p-4">
      <div className="container mx-auto text-center">
        <p>© {currentYear} Custom Canvas App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
