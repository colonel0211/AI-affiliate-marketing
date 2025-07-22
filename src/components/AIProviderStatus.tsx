import React from 'react';
import { 
  Bot, 
  Zap, 
  Image, 
  Video, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  RefreshCw,
  Settings,
  TrendingUp
} from 'lucide-react';

const AIProviderStatus = () => {
  const videoProviders = [
    {
      name: 'Veo 3 (Google)',
      type: 'Video Generation',
      status: 'active',
      usage: '234/1000',
      quota: 'Daily',
      successRate: '94.2%',
      avgTime: '45s',
      cost: 'Free',
      quality: '9.1/10',
      lastUsed: '2 min ago'
    },
    {
      name: 'Hugging Face Video',
      type: 'Video Generation',
      status: 'active',
      usage: '67/500',
      quota: 'Daily',
      successRate: '87.3%',
      avgTime: '62s',
      cost: 'Free',
      quality: '7.8/10',
      lastUsed: '15 min ago'
    },
    {
      name: 'Runway ML',
      type: 'Video Generation',
      status: 'quota_reached',
      usage: '100/100',
      quota: 'Daily',
      successRate: '91.5%',
      avgTime: '38s',
      cost: 'Free tier',
      quality: '8.9/10',
      lastUsed: '3 hours ago'
    },
    {
      name: 'Stability AI Video',
      type: 'Video Generation',
      status: 'active',
      usage: '45/200',
      quota: 'Daily',
      successRate: '89.7%',
      avgTime: '52s',
      cost: 'Free',
      quality: '8.4/10',
      lastUsed: '8 min ago'
    }
  ];

  const imageProviders = [
    {
      name: 'DALL-E 3 (OpenAI)',
      type: 'Image Generation',
      status: 'active',
      usage: '89/1000',
      quota: 'Daily',
      successRate: '96.8%',
      avgTime: '12s',
      cost: 'Free tier',
      quality: '9.4/10',
      lastUsed: '1 min ago'
    },
    {
      name: 'Midjourney',
      type: 'Image Generation',
      status: 'warning',
      usage: '180/200',
      quota: 'Daily',
      successRate: '94.1%',
      avgTime: '18s',
      cost: 'Free trial',
      quality: '9.7/10',
      lastUsed: '5 min ago'
    },
    {
      name: 'Stable Diffusion',
      type: 'Image Generation',
      status: 'active',
      usage: '234/unlimited',
      quota: 'N/A',
      successRate: '92.3%',
      avgTime: '8s',
      cost: 'Free',
      quality: '8.6/10',
      lastUsed: '30 sec ago'
    },
    {
      name: 'Leonardo AI',
      type: 'Image Generation',
      status: 'active',
      usage: '45/150',
      quota: 'Daily',
      successRate: '88.9%',
      avgTime: '15s',
      cost: 'Free tier',
      quality: '8.2/10',
      lastUsed: '7 min ago'
    }
  ];

  const textProviders = [
    {
      name: 'GPT-4 Turbo',
      type: 'Text Generation',
      status: 'active',
      usage: '456/10000',
      quota: 'Monthly',
      successRate: '98.7%',
      avgTime: '2s',
      cost: 'Free tier',
      quality: '9.8/10',
      lastUsed: '30 sec ago'
    },
    {
      name: 'Claude 3.5 Sonnet',
      type: 'Text Generation',
      status: 'active',
      usage: '234/1000',
      quota: 'Daily',
      successRate: '97.9%',
      avgTime: '1.8s',
      cost: 'Free tier',
      quality: '9.6/10',
      lastUsed: '1 min ago'
    },
    {
      name: 'Gemini Pro',
      type: 'Text Generation',
      status: 'active',
      usage: '123/2000',
      quota: 'Daily',
      successRate: '96.4%',
      avgTime: '2.2s',
      cost: 'Free',
      quality: '9.2/10',
      lastUsed: '45 sec ago'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'quota_reached': return XCircle;
      case 'error': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'quota_reached': return 'text-red-400 bg-red-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video Generation': return Video;
      case 'Image Generation': return Image;
      case 'Text Generation': return Bot;
      default: return Bot;
    }
  };

  const ProviderSection = ({ title, providers, icon: SectionIcon }: any) => (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <SectionIcon className="h-6 w-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      </div>
      
      <div className="divide-y divide-gray-700">
        {providers.map((provider: any, index: number) => {
          const StatusIcon = getStatusIcon(provider.status);
          const TypeIcon = getTypeIcon(provider.type);
          
          return (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <TypeIcon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{provider.name}</h4>
                    <p className="text-gray-400 text-sm">{provider.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(provider.status)}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="capitalize">{provider.status.replace('_', ' ')}</span>
                  </div>
                  <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Settings className="h-4 w-4 text-gray-300" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">Usage</div>
                  <div className="text-white font-semibold">{provider.usage}</div>
                </div>
                <div>
                  <div className="text-gray-400">Success Rate</div>
                  <div className="text-green-400 font-semibold">{provider.successRate}</div>
                </div>
                <div>
                  <div className="text-gray-400">Avg Time</div>
                  <div className="text-blue-400 font-semibold">{provider.avgTime}</div>
                </div>
                <div>
                  <div className="text-gray-400">Cost</div>
                  <div className="text-purple-400 font-semibold">{provider.cost}</div>
                </div>
                <div>
                  <div className="text-gray-400">Quality</div>
                  <div className="text-yellow-400 font-semibold">{provider.quality}</div>
                </div>
                <div>
                  <div className="text-gray-400">Last Used</div>
                  <div className="text-gray-300 font-medium">{provider.lastUsed}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">AI Provider Status</h1>
        <p className="text-gray-400">Monitor all AI providers with automatic failover when limits are reached</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Video className="h-8 w-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm text-gray-400">Video Providers Active</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Image className="h-8 w-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">8</div>
              <div className="text-sm text-gray-400">Image Providers Active</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">6</div>
              <div className="text-sm text-gray-400">Text Providers Active</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">96.2%</div>
              <div className="text-sm text-gray-400">Overall Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Sections */}
      <ProviderSection title="Video Generation Providers" providers={videoProviders} icon={Video} />
      <ProviderSection title="Image Generation Providers" providers={imageProviders} icon={Image} />
      <ProviderSection title="Text Generation Providers" providers={textProviders} icon={Bot} />

      {/* Failover Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Failover Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Primary Video Provider
              </label>
              <select className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg">
                <option>Veo 3 (Google)</option>
                <option>Hugging Face Video</option>
                <option>Runway ML</option>
                <option>Stability AI Video</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Failover Threshold
              </label>
              <select className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg">
                <option>90% quota reached</option>
                <option>95% quota reached</option>
                <option>100% quota reached</option>
                <option>Error rate {'>'}  10%</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="auto-failover" className="rounded" defaultChecked />
              <label htmlFor="auto-failover" className="text-gray-300 text-sm">
                Enable automatic failover
              </label>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Provider Controls</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh All</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Configure</span>
            </button>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Test Providers
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Reset Quotas
            </button>
          </div>
          
          <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-medium">System Status</span>
            </div>
            <p className="text-sm text-gray-300">All failover systems operational. 26 providers ready.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProviderStatus;