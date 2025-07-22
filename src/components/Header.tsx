import React from 'react';
import { Bot, DollarSign, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Bot className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-white">AI Affiliate Marketing Server</h1>
            <p className="text-sm text-gray-400">Target: $1,000,000/month • Autonomous Operation</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-semibold">Active</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-yellow-400" />
            <span className="text-yellow-400 font-semibold">$23,456</span>
            <span className="text-gray-400 text-sm">this month</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;