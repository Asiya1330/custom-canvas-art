// pages/contact/index.tsx
import React from 'react';
import Link from 'next/link';

const ContactPage: React.FC = () => {
  return (
    <div>
      <h1>Contact Page</h1>
      <nav>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/news">News</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default ContactPage;
