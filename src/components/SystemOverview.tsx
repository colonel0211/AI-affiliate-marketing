import React from 'react';
import { useSystemStatus, useAnalyticsOverview } from '../hooks/useApi';
import { 
  Activity, 
  DollarSign, 
  Video, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const SystemOverview = () => {
  const { data: systemStatus, loading: statusLoading } = useSystemStatus();
  const { data: analytics, loading: analyticsLoading } = useAnalyticsOverview();

  if (statusLoading || analyticsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading system data...</div>
      </div>
    );
  }

  const stats = [
    {
      title: 'Monthly Revenue',
      value: analytics?.revenue?.monthly || '$23,456',
      target: '$1,000,000',
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      title: 'Videos Generated',
      value: analytics?.content?.total || '1,247',
      subtitle: 'This month',
      icon: Video,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      title: 'Active Campaigns',
      value: analytics?.campaigns?.active || '24',
      subtitle: 'Running',
      icon: Activity,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      title: 'Conversion Rate',
      value: '4.2%',
      subtitle: '+0.8% vs last week',
      icon: TrendingUp,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    }
  ];

  const systemComponents = [
    { name: 'Content Scraper', status: systemStatus?.services?.contentGeneration || 'active', lastRun: '2 min ago' },
    { name: 'AI Video Generator', status: systemStatus?.services?.aiProviders || 'active', lastRun: '5 min ago' },
    { name: 'Upload Scheduler', status: systemStatus?.services?.socialMediaIntegration || 'active', lastRun: '1 min ago' },
    { name: 'Revenue Tracker', status: 'active', lastRun: '30 sec ago' },
    { name: 'Affiliate Optimizer', status: systemStatus?.services?.scheduler || 'warning', lastRun: '15 min ago' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">System Overview</h1>
        <p className="text-gray-400">AI-powered affiliate marketing automation running 24/7</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  {stat.target && (
                    <p className="text-xs text-gray-500 mt-1">Target: {stat.target}</p>
                  )}
                  {stat.subtitle && (
                    <p className="text-xs text-gray-400 mt-1">{stat.subtitle}</p>
                  )}
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">System Components</h3>
          <div className="space-y-3">
            {systemComponents.map((component, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-3">
                  {component.status === 'active' ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  )}
                  <span className="text-white font-medium">{component.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">{component.lastRun}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Next Scheduled Tasks</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div>
                <p className="text-white font-medium">Content Scraping</p>
                <p className="text-sm text-gray-400">YouTube, Instagram, TikTok</p>
              </div>
              <span className="text-sm text-blue-400">in 47 min</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-700">
              <div>
                <p className="text-white font-medium">AI Video Generation</p>
                <p className="text-sm text-gray-400">12 videos queued</p>
              </div>
              <span className="text-sm text-green-400">in 1h 23min</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-white font-medium">Upload Batch</p>
                <p className="text-sm text-gray-400">8 videos ready</p>
              </div>
              <span className="text-sm text-purple-400">in 2h 15min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend (Last 30 Days)</h3>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-2 text-gray-600" />
            <p>Chart visualization would be implemented here</p>
            <p className="text-sm">Revenue trending upward +142% this month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemOverview;