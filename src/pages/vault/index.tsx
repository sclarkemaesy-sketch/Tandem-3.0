import React from 'react';
import Head from 'next/head';

const Vault: React.FC = () => {
  return (
    <>
      <Head>
        <title>Vault - Tandem 3.0</title>
        <meta name="description" content="Tandem 3.0 Question Vault" />
      </Head>
      <div style={{ padding: '20px' }}>
        <h1>Question Vault</h1>
        <p>Browse and manage your question bank</p>
        <div>
          <h2>Question Categories</h2>
          <ul>
            <li>Mathematics</li>
            <li>Science</li>
            <li>History</li>
            <li>Language Arts</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Vault;