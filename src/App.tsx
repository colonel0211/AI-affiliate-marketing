import React from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;