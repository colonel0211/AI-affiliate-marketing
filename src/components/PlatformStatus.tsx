import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Hash, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  Upload,
  Users,
  Eye,
  TrendingUp
} from 'lucide-react';

const PlatformStatus = () => {
  const platforms = [
    {
      name: 'YouTube',
      icon: Youtube,
      status: 'connected',
      apiStatus: 'active',
      uploadsToday: 23,
      totalVideos: 1247,
      subscribers: '45.2K',
      views: '2.3M',
      revenue: '$8,234',
      lastUpload: '12 minutes ago',
      nextUpload: '2 hours 15 min',
      issues: []
    },
    {
      name: 'Instagram',
      icon: Instagram,
      status: 'connected',
      apiStatus: 'active',
      uploadsToday: 18,
      totalVideos: 892,
      subscribers: '32.1K',
      views: '1.8M',
      revenue: '$6,789',
      lastUpload: '8 minutes ago',
      nextUpload: '45 minutes',
      issues: []
    },
    {
      name: 'TikTok',
      icon: Hash,
      status: 'connected',
      apiStatus: 'warning',
      uploadsToday: 15,
      totalVideos: 634,
      subscribers: '78.9K',
      views: '5.2M',
      revenue: '$4,321',
      lastUpload: '25 minutes ago',
      nextUpload: '1 hour 30 min',
      issues: ['Rate limit approaching']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return XCircle;
      default: return AlertCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': 
      case 'active': 
        return 'text-green-400 bg-green-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const uploadMethods = [
    {
      method: 'YouTube Data API v3',
      status: 'active',
      description: 'Official API with quota limits',
      dailyQuota: '10,000 units',
      used: '2,340',
      success: '98.2%'
    },
    {
      method: 'Instagram Basic Display API',
      status: 'active',
      description: 'Public API for content upload',
      dailyQuota: '200 requests',
      used: '45',
      success: '96.8%'
    },
    {
      method: 'TikTok Content Posting API',
      status: 'warning',
      description: 'Third-party integration',
      dailyQuota: '100 uploads',
      used: '78',
      success: '89.4%'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Platform Status</h1>
        <p className="text-gray-400">Monitor connection status and upload performance across all platforms</p>
      </div>

      {/* Platform Overview */}
      <div className="grid gap-6">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          const StatusIcon = getStatusIcon(platform.apiStatus);
          
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(platform.status)}`}>
                        <StatusIcon className="h-3 w-3" />
                        <span className="capitalize">{platform.status}</span>
                      </div>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(platform.apiStatus)}`}>
                        <span>API {platform.apiStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-green-400 font-semibold text-lg">{platform.revenue}</div>
                  <div className="text-sm text-gray-400">Revenue this month</div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Upload className="h-4 w-4" />
                    <span>Today</span>
                  </div>
                  <div className="text-white font-semibold text-lg">{platform.uploadsToday}</div>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Eye className="h-4 w-4" />
                    <span>Total Views</span>
                  </div>
                  <div className="text-blue-400 font-semibold text-lg">{platform.views}</div>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-gray-400 text-sm">
                    <Users className="h-4 w-4" />
                    <span>Followers</span>
                  </div>
                  <div className="text-purple-400 font-semibold text-lg">{platform.subscribers}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Last Upload</div>
                  <div className="text-white font-medium">{platform.lastUpload}</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm">Next Upload</div>
                  <div className="text-yellow-400 font-medium">{platform.nextUpload}</div>
                </div>
              </div>

              {platform.issues.length > 0 && (
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Issues:</span>
                  </div>
                  <ul className="mt-1 text-sm text-gray-300">
                    {platform.issues.map((issue, issueIndex) => (
                      <li key={issueIndex}>• {issue}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upload Methods */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Upload Methods & APIs</h3>
          <p className="text-sm text-gray-400 mt-1">Monitoring API usage and success rates</p>
        </div>
        
        <div className="divide-y divide-gray-700">
          {uploadMethods.map((method, index) => {
            const StatusIcon = getStatusIcon(method.status);
            return (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${getStatusColor(method.status)}`}>
                        <StatusIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{method.method}</h4>
                        <p className="text-gray-400 text-sm">{method.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-6 text-right">
                    <div>
                      <div className="text-gray-400 text-xs">Daily Quota</div>
                      <div className="text-white font-semibold">{method.dailyQuota}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Used</div>
                      <div className="text-blue-400 font-semibold">{method.used}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Success Rate</div>
                      <div className="text-green-400 font-semibold">{method.success}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Test All APIs
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Refresh Status
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Reset Quotas
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Configure APIs
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Upload Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Uploads Today</span>
              <span className="text-white font-semibold">56</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Success Rate</span>
              <span className="text-green-400 font-semibold">96.4%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Average Upload Time</span>
              <span className="text-blue-400 font-semibold">2.3 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Queue Length</span>
              <span className="text-yellow-400 font-semibold">8 videos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatus;