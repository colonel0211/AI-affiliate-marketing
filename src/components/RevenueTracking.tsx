import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Target, 
  Calendar,
  ExternalLink,
  Percent,
  Award,
  Clock
} from 'lucide-react';

const RevenueTracking = () => {
  const revenueStats = [
    {
      title: 'This Month',
      value: '$23,456',
      change: '+142%',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      title: 'Daily Average',
      value: '$782',
      change: '+23%',
      icon: Calendar,
      color: 'text-blue-400'
    },
    {
      title: 'Target Progress',
      value: '2.3%',
      change: 'On track',
      icon: Target,
      color: 'text-purple-400'
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      change: '+0.8%',
      icon: Percent,
      color: 'text-yellow-400'
    }
  ];

  const topPrograms = [
    {
      name: 'AI Tools Affiliate',
      commission: '40%',
      revenue: '$8,234',
      clicks: '2,341',
      conversions: '98',
      category: 'AI/SaaS'
    },
    {
      name: 'Online Course Platform',
      commission: '25%',
      revenue: '$6,789',
      clicks: '3,456',
      conversions: '156',
      category: 'Education'
    },
    {
      name: 'Crypto Trading Bot',
      commission: '35%',
      revenue: '$4,321',
      clicks: '1,234',
      conversions: '67',
      category: 'Crypto'
    },
    {
      name: 'Marketing Tools Suite',
      commission: '30%',
      revenue: '$3,112',
      clicks: '2,098',
      conversions: '89',
      category: 'Marketing'
    }
  ];

  const recentCommissions = [
    {
      program: 'AI Tools Affiliate',
      amount: '$127.43',
      date: '2 hours ago',
      source: 'YouTube Video'
    },
    {
      program: 'Online Course Platform',
      amount: '$89.32',
      date: '4 hours ago',
      source: 'Instagram Reel'
    },
    {
      program: 'Crypto Trading Bot',
      amount: '$234.67',
      date: '6 hours ago',
      source: 'TikTok Video'
    },
    {
      program: 'Marketing Tools Suite',
      amount: '$67.89',
      date: '8 hours ago',
      source: 'YouTube Short'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Revenue Tracking</h1>
        <p className="text-gray-400">Real-time affiliate revenue monitoring and optimization</p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {revenueStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`${stat.color} bg-gray-700 p-3 rounded-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Target */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Monthly Revenue Target</h3>
          <Target className="h-5 w-5 text-purple-400" />
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Progress to $1,000,000</span>
            <span className="text-white">$23,456 (2.3%)</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full" style={{width: '2.3%'}}></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Remaining:</span>
            <span className="text-white ml-2 font-semibold">$976,544</span>
          </div>
          <div>
            <span className="text-gray-400">Days Left:</span>
            <span className="text-white ml-2 font-semibold">8 days</span>
          </div>
          <div>
            <span className="text-gray-400">Needed Daily:</span>
            <span className="text-yellow-400 ml-2 font-semibold">$122,068</span>
          </div>
        </div>
      </div>

      {/* Top Performing Programs */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Top Performing Affiliate Programs</h3>
        </div>
        
        <div className="divide-y divide-gray-700">
          {topPrograms.map((program, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-2 rounded-lg">
                      <Award className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{program.name}</h4>
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">{program.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6 text-right">
                  <div>
                    <div className="text-green-400 font-semibold">{program.revenue}</div>
                    <div className="text-xs text-gray-400">Revenue</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-semibold">{program.commission}</div>
                    <div className="text-xs text-gray-400">Commission</div>
                  </div>
                  <div>
                    <div className="text-white font-semibold">{program.clicks}</div>
                    <div className="text-xs text-gray-400">Clicks</div>
                  </div>
                  <div>
                    <div className="text-purple-400 font-semibold">{program.conversions}</div>
                    <div className="text-xs text-gray-400">Conversions</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Commissions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Commissions</h3>
          </div>
          
          <div className="divide-y divide-gray-700">
            {recentCommissions.map((commission, index) => (
              <div key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-white font-medium">{commission.program}</div>
                    <div className="text-sm text-gray-400">{commission.source}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{commission.amount}</div>
                    <div className="text-xs text-gray-400 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {commission.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Optimization</h3>
          
          <div className="space-y-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">Trending Opportunity</span>
              </div>
              <p className="text-sm text-gray-300">AI Tools category showing 300% increase in conversions</p>
            </div>
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-medium">Optimization Suggestion</span>
              </div>
              <p className="text-sm text-gray-300">Focus on YouTube content - highest conversion rate at 6.2%</p>
            </div>
            
            <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="h-4 w-4 text-purple-400" />
                <span className="text-purple-400 font-medium">New Program Available</span>
              </div>
              <p className="text-sm text-gray-300">High-converting crypto course with 50% commission rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueTracking;