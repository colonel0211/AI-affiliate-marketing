import React from 'react';
import { 
  Calendar, 
  Clock, 
  Play, 
  Pause, 
  Settings, 
  Plus,
  Youtube,
  Instagram,
  Hash,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const CampaignScheduler = () => {
  const activeCampaigns = [
    {
      name: 'AI Tools Promotion',
      platform: 'YouTube',
      status: 'active',
      nextPost: '2 hours 15 min',
      videosQueued: 12,
      totalViews: '145K',
      revenue: '$2,340',
      frequency: 'Every 3 hours'
    },
    {
      name: 'Crypto Education Series',
      platform: 'Instagram',
      status: 'active',
      nextPost: '45 minutes',
      videosQueued: 8,
      totalViews: '89K',
      revenue: '$1,567',
      frequency: 'Every 2 hours'
    },
    {
      name: 'Passive Income Tips',
      platform: 'TikTok',
      status: 'paused',
      nextPost: 'Paused',
      videosQueued: 15,
      totalViews: '234K',
      revenue: '$3,421',
      frequency: 'Every 4 hours'
    }
  ];

  const upcomingPosts = [
    {
      title: 'Top 5 AI Tools for Passive Income 2025',
      platform: 'YouTube',
      scheduledTime: '12:30 PM',
      estimatedViews: '15K-25K',
      affiliateLinks: 3
    },
    {
      title: 'How I Make $1000/Day with AI (No Experience)',
      platform: 'Instagram',
      scheduledTime: '2:15 PM',
      estimatedViews: '8K-12K',
      affiliateLinks: 2
    },
    {
      title: 'Secret AI Strategy Banks Don\'t Want You to Know',
      platform: 'TikTok',
      scheduledTime: '4:45 PM',
      estimatedViews: '20K-35K',
      affiliateLinks: 4
    },
    {
      title: 'Free AI Course That Changed My Life',
      platform: 'YouTube',
      scheduledTime: '6:30 PM',
      estimatedViews: '12K-18K',
      affiliateLinks: 1
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return Youtube;
      case 'instagram': return Instagram;
      case 'tiktok': return Hash;
      default: return Hash;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Campaign Scheduler</h1>
        <p className="text-gray-400">Automated content scheduling across all platforms</p>
      </div>

      {/* Campaign Overview */}
      <div className="grid gap-6">
        {activeCampaigns.map((campaign, index) => {
          const PlatformIcon = getPlatformIcon(campaign.platform);
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <PlatformIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{campaign.name}</h3>
                    <p className="text-gray-400 text-sm">{campaign.platform} • {campaign.frequency}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.toUpperCase()}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <Play className="h-4 w-4 text-gray-300" />
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <Pause className="h-4 w-4 text-gray-300" />
                    </button>
                    <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                      <Settings className="h-4 w-4 text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Next Post</div>
                  <div className="text-white font-semibold">{campaign.nextPost}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Videos Queued</div>
                  <div className="text-white font-semibold">{campaign.videosQueued}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Views</div>
                  <div className="text-blue-400 font-semibold">{campaign.totalViews}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Revenue</div>
                  <div className="text-green-400 font-semibold">{campaign.revenue}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="flex items-center space-x-1">
                    {campaign.status === 'active' ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-yellow-400" />
                    )}
                    <span className="text-white text-sm capitalize">{campaign.status}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Posts */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Upcoming Posts Today</h3>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Post</span>
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-700">
          {upcomingPosts.map((post, index) => {
            const PlatformIcon = getPlatformIcon(post.platform);
            return (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-700 p-2 rounded-lg">
                      <PlatformIcon className="h-5 w-5 text-gray-300" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{post.title}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                        <span>{post.platform}</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.scheduledTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-blue-400 font-semibold">{post.estimatedViews}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {post.affiliateLinks} affiliate links
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Scheduler Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Schedule Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Posting Frequency
              </label>
              <select className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg">
                <option>Every 3 hours</option>
                <option>Every 2 hours</option>
                <option>Every 4 hours</option>
                <option>Every 6 hours</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Optimal Posting Times
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-700 p-2 rounded text-center text-sm text-gray-300">
                  12:00 PM
                </div>
                <div className="bg-gray-700 p-2 rounded text-center text-sm text-gray-300">
                  3:00 PM
                </div>
                <div className="bg-gray-700 p-2 rounded text-center text-sm text-gray-300">
                  6:00 PM
                </div>
                <div className="bg-gray-700 p-2 rounded text-center text-sm text-gray-300">
                  9:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Today</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-gray-400">Posts Scheduled</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-gray-400">Posts Published</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">$432</div>
              <div className="text-sm text-gray-400">Revenue Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">89K</div>
              <div className="text-sm text-gray-400">Total Reach</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
              Optimize Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignScheduler;