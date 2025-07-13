import React from 'react';
import Head from 'next/head';

const Dashboard: React.FC = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Tandem 3.0</title>
        <meta name="description" content="Tandem 3.0 Dashboard" />
      </Head>
      <div style={{ padding: '20px' }}>
        <h1>Dashboard</h1>
        <p>Welcome to the Tandem 3.0 Dashboard</p>
        <div>
          <h2>Quick Stats</h2>
          <p>Quiz sets: Loading...</p>
          <p>Questions: Loading...</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;