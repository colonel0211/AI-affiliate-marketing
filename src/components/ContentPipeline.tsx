import React from 'react';
import { 
  Search, 
  Wand2, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Eye,
  Heart,
  Share
} from 'lucide-react';

const ContentPipeline = () => {
  const pipelineStages = [
    {
      name: 'Content Discovery',
      icon: Search,
      status: 'active',
      count: 23,
      description: 'Scanning trending content across platforms'
    },
    {
      name: 'AI Processing',
      icon: Wand2,
      status: 'active',
      count: 12,
      description: 'Generating videos with AI providers'
    },
    {
      name: 'Upload Queue',
      icon: Upload,
      status: 'waiting',
      count: 8,
      description: 'Ready for scheduled upload'
    },
    {
      name: 'Published',
      icon: CheckCircle,
      status: 'completed',
      count: 1247,
      description: 'Successfully uploaded and tracking'
    }
  ];

  const recentContent = [
    {
      title: '10 AI Tools That Will Make You Rich in 2025',
      platform: 'YouTube',
      views: '45.2K',
      engagement: '4.8%',
      revenue: '$127.43',
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop'
    },
    {
      title: 'Passive Income Secrets Nobody Talks About',
      platform: 'Instagram',
      views: '23.1K',
      engagement: '6.2%',
      revenue: '$89.32',
      status: 'published',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop'
    },
    {
      title: 'From $0 to $10K/Month with Affiliate Marketing',
      platform: 'TikTok',
      views: '78.9K',
      engagement: '8.1%',
      revenue: '$234.67',
      status: 'processing',
      thumbnail: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop'
    },
    {
      title: 'The AI Revolution: Make Money While You Sleep',
      platform: 'YouTube',
      views: '12.4K',
      engagement: '5.3%',
      revenue: '$67.89',
      status: 'queued',
      thumbnail: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&fit=crop'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'waiting': return 'text-yellow-400 bg-yellow-400/10';
      case 'completed': return 'text-blue-400 bg-blue-400/10';
      case 'published': return 'text-green-400';
      case 'processing': return 'text-yellow-400';
      case 'queued': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return CheckCircle;
      case 'processing': return Clock;
      case 'queued': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Content Pipeline</h1>
        <p className="text-gray-400">Real-time view of content creation and publishing workflow</p>
      </div>

      {/* Pipeline Stages */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pipelineStages.map((stage, index) => {
          const Icon = stage.icon;
          return (
            <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getStatusColor(stage.status)}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-2xl font-bold text-white">{stage.count}</span>
              </div>
              <h3 className="font-semibold text-white mb-1">{stage.name}</h3>
              <p className="text-sm text-gray-400">{stage.description}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Content */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Recent Content</h3>
          <p className="text-sm text-gray-400">Latest AI-generated content and performance</p>
        </div>
        
        <div className="divide-y divide-gray-700">
          {recentContent.map((content, index) => {
            const StatusIcon = getStatusIcon(content.status);
            return (
              <div key={index} className="p-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={content.thumbnail} 
                    alt={content.title}
                    className="w-16 h-10 object-cover rounded-lg bg-gray-700"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium truncate">{content.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-400">{content.platform}</span>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{content.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-400">{content.engagement}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-green-400 font-semibold">{content.revenue}</div>
                    <div className={`flex items-center space-x-1 mt-1 ${getStatusColor(content.status)}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="text-sm capitalize">{content.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pipeline Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Content Sources</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">YouTube Trending</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Instagram Reels</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Active</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">TikTok Viral</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-gray-400">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Performance Today</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-sm text-gray-400">Videos Created</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">23</div>
              <div className="text-sm text-gray-400">Videos Published</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">$432</div>
              <div className="text-sm text-gray-400">Revenue Generated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">89K</div>
              <div className="text-sm text-gray-400">Total Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentPipeline;