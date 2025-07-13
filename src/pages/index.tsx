import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>Tandem 3.0 - AI-Powered Question Bank</title>
        <meta name="description" content="AI-Powered Question Bank & Quiz Platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Tandem 3.0</h1>
        <p>AI-Powered Question Bank & Quiz Platform</p>
        
        <nav style={{ margin: '20px 0' }}>
          <Link href="/dashboard" style={{ marginRight: '20px', color: 'blue' }}>
            Dashboard
          </Link>
          <Link href="/vault" style={{ color: 'blue' }}>
            Question Vault
          </Link>
        </nav>
        
        <div>
          <h2>Features</h2>
          <ul>
            <li>Google Sheets Integration</li>
            <li>Firestore Database</li>
            <li>Firebase Authentication</li>
            <li>AI-Powered Question Generation</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;