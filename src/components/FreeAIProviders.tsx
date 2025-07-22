import React from 'react';
import { 
  Image, 
  Video, 
  Mic, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Zap,
  RefreshCw,
  Settings,
  TrendingUp,
  Target
} from 'lucide-react';

const FreeAIProviders = () => {
  const freeProviders = {
    image: [
      { name: 'Flux Kontext', limit: '100/day', usage: '45', status: 'active', trial: '28 days', quality: '9.2/10' },
      { name: 'DALL-E 3 (OpenAI)', limit: '50/day', usage: '23', status: 'active', trial: 'Free tier', quality: '9.4/10' },
      { name: 'Midjourney', limit: '25/trial', usage: '0', status: 'standby', trial: 'Free trial', quality: '9.7/10' },
      { name: 'Stable Diffusion', limit: 'Unlimited', usage: '234', status: 'active', trial: 'Always free', quality: '8.6/10' },
      { name: 'Leonardo AI', limit: '150/day', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.2/10' },
      { name: 'Playground AI', limit: '100/day', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.8/10' },
      { name: 'Ideogram', limit: '80/day', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.4/10' },
      { name: 'Adobe Firefly', limit: '25/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.9/10' },
      { name: 'Canva AI', limit: '50/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '7.8/10' },
      { name: 'Bing Image Creator', limit: '15/day', usage: '0', status: 'standby', trial: 'Always free', quality: '8.1/10' }
    ],
    video: [
      { name: 'Veo 3 (Google)', limit: '30/month', usage: '12', status: 'active', trial: '25 days', quality: '9.1/10' },
      { name: 'Runway ML', limit: '100/trial', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.9/10' },
      { name: 'Pika Labs', limit: '50/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.5/10' },
      { name: 'Stable Video Diffusion', limit: '25/day', usage: '8', status: 'active', trial: 'Free tier', quality: '8.4/10' },
      { name: 'LumaAI Dream Machine', limit: '30/month', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.7/10' },
      { name: 'Haiper AI', limit: '40/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.2/10' },
      { name: 'Kaiber', limit: '20/trial', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.6/10' },
      { name: 'InVideo AI', limit: '10/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '7.9/10' },
      { name: 'Synthesia', limit: '3/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.8/10' },
      { name: 'D-ID', limit: '20/trial', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.3/10' }
    ],
    voice: [
      { name: 'ElevenLabs', limit: '10k chars/month', usage: '2340', status: 'active', trial: 'Free tier', quality: '9.6/10' },
      { name: 'Murf AI', limit: '120 min/trial', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.9/10' },
      { name: 'Speechify', limit: '100 min/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.4/10' },
      { name: 'Lovo AI', limit: '50 min/trial', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.7/10' },
      { name: 'Resemble AI', limit: '40 min/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.5/10' },
      { name: 'Descript Overdub', limit: '30 min/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.8/10' },
      { name: 'Replica Studios', limit: '60 min/trial', usage: '0', status: 'standby', trial: 'Free trial', quality: '8.6/10' },
      { name: 'Voicemod', limit: 'Unlimited', usage: '45', status: 'standby', trial: 'Always free', quality: '7.2/10' }
    ],
    text: [
      { name: 'GPT-4 Turbo', limit: '1000/month', usage: '456', status: 'active', trial: 'Free tier', quality: '9.8/10' },
      { name: 'Claude 3.5 Sonnet', limit: '500/day', usage: '234', status: 'active', trial: 'Free tier', quality: '9.6/10' },
      { name: 'Gemini Pro', limit: '1000/day', usage: '123', status: 'active', trial: 'Free tier', quality: '9.2/10' },
      { name: 'Perplexity AI', limit: '300/day', usage: '0', status: 'standby', trial: 'Free tier', quality: '9.0/10' },
      { name: 'Cohere', limit: '100/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.8/10' },
      { name: 'Hugging Face', limit: 'Unlimited', usage: '567', status: 'active', trial: 'Always free', quality: '8.4/10' },
      { name: 'Mistral AI', limit: '200/day', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.9/10' },
      { name: 'Together AI', limit: '150/month', usage: '0', status: 'standby', trial: 'Free tier', quality: '8.6/10' }
    ]
  };

  const automationStrategies = [
    {
      name: 'Smart Quota Management',
      description: 'Automatically switches providers before hitting limits',
      status: 'active',
      savings: '$1,200/month'
    },
    {
      name: 'Trial Rotation System',
      description: 'Cycles through free trials across multiple accounts',
      status: 'active',
      savings: '$800/month'
    },
    {
      name: 'Quality-Based Selection',
      description: 'Chooses best available provider for each content type',
      status: 'active',
      savings: '$600/month'
    },
    {
      name: 'Batch Processing',
      description: 'Maximizes free tier usage through efficient batching',
      status: 'active',
      savings: '$400/month'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'standby': return 'text-blue-400 bg-blue-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'standby': return Clock;
      case 'warning': return AlertTriangle;
      default: return Clock;
    }
  };

  const ProviderSection = ({ title, providers, icon: SectionIcon }: any) => (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SectionIcon className="h-5 w-5 text-blue-400" />
            <h4 className="font-semibold text-white">{title}</h4>
          </div>
          <span className="text-sm text-gray-400">{providers.length} providers</span>
        </div>
      </div>
      <div className="p-4">
        <div className="grid gap-3">
          {providers.map((provider: any, index: number) => {
            const StatusIcon = getStatusIcon(provider.status);
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`p-1 rounded ${getStatusColor(provider.status)}`}>
                    <StatusIcon className="h-3 w-3" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{provider.name}</div>
                    <div className="text-xs text-gray-400">{provider.trial}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-300">{provider.usage}/{provider.limit}</div>
                  <div className="text-xs text-yellow-400">{provider.quality}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Free AI Providers Network</h1>
        <p className="text-gray-400">Comprehensive free AI tools with automatic failover for continuous 24/7 autonomous operation</p>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Image className="h-8 w-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{freeProviders.image.length}</div>
              <div className="text-sm text-gray-400">Image Providers</div>
              <div className="text-xs text-green-400">All free tiers</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Video className="h-8 w-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{freeProviders.video.length}</div>
              <div className="text-sm text-gray-400">Video Providers</div>
              <div className="text-xs text-blue-400">Free trials ready</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Mic className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{freeProviders.voice.length}</div>
              <div className="text-sm text-gray-400">Voice Providers</div>
              <div className="text-xs text-purple-400">Free tiers active</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <FileText className="h-8 w-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">{freeProviders.text.length}</div>
              <div className="text-sm text-gray-400">Text Providers</div>
              <div className="text-xs text-yellow-400">High quality free</div>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProviderSection title="Image Generation (Free)" providers={freeProviders.image} icon={Image} />
        <ProviderSection title="Video Generation (Free)" providers={freeProviders.video} icon={Video} />
        <ProviderSection title="Voice Generation (Free)" providers={freeProviders.voice} icon={Mic} />
        <ProviderSection title="Text Generation (Free)" providers={freeProviders.text} icon={FileText} />
      </div>

      {/* Automation Strategies */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Cost Optimization Strategies</h3>
          <p className="text-sm text-gray-400 mt-1">Automated systems to maximize free tier usage</p>
        </div>
        
        <div className="divide-y divide-gray-700">
          {automationStrategies.map((strategy, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{strategy.name}</h4>
                    <p className="text-gray-400 text-sm">{strategy.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">{strategy.savings}</div>
                  <div className="text-xs text-gray-400">Estimated savings</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Free Tier Management</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh All</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Test Providers
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Reset Quotas
              </button>
            </div>
            
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-medium">Continuous Strategy</span>
              </div>
              <p className="text-sm text-gray-300">Optimized to run completely free indefinitely with auto-scaling</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Autonomous Operation Status</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Free Providers</span>
              <span className="text-green-400 font-semibold">38/42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Standby Providers</span>
              <span className="text-blue-400 font-semibold">28</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Daily Failovers</span>
              <span className="text-yellow-400 font-semibold">5-8 avg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Continuous Operation</span>
              <span className="text-green-400 font-semibold">∞ Indefinite</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Continuous Free Tier Optimization</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '94%'}}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">94% efficiency - Optimized for continuous free usage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeAIProviders;