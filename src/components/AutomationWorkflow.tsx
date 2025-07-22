import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Play, 
  Pause,
  Settings,
  RefreshCw,
  Zap,
  Image,
  Video,
  Mic,
  FileText,
  TrendingUp,
  Target,
  Bot
} from 'lucide-react';

const AutomationWorkflow = () => {
  const [activePhase, setActivePhase] = useState('setup');

  const workflowPhases = [
    {
      id: 'setup',
      name: 'Initial Setup',
      status: 'completed',
      duration: '1 day',
      tasks: [
        'Account creation for all AI providers',
        'Voice cloning setup in ElevenLabs',
        'Content calendar creation (30 days)',
        'Base prompt templates preparation',
        'Reference photo upload and testing'
      ]
    },
    {
      id: 'automation',
      name: 'Automation Architecture',
      status: 'active',
      duration: 'Ongoing',
      tasks: [
        'Content scheduling system active',
        'Dynamic prompt generator running',
        'Image generation pipeline operational',
        'Video creation sequence automated',
        'Voice integration synchronized'
      ]
    },
    {
      id: 'production',
      name: 'Daily Production',
      status: 'active',
      duration: '30 days',
      tasks: [
        'Automated daily video creation',
        'Quality control monitoring',
        'Performance optimization',
        'Content variety management',
        'Resource usage tracking'
      ]
    },
    {
      id: 'scaling',
      name: 'Scaling & Optimization',
      status: 'pending',
      duration: 'Week 4',
      tasks: [
        'Batch processing implementation',
        'Resource management optimization',
        'Backup plan activation',
        'Transition planning',
        'Content stockpiling'
      ]
    }
  ];

  const aiProviders = {
    image: [
      { name: 'Flux Kontext', status: 'active', usage: '45/100', trial: '28 days left' },
      { name: 'DALL-E 3', status: 'active', usage: '23/50', trial: 'Free tier' },
      { name: 'Midjourney', status: 'standby', usage: '0/25', trial: 'Free trial ready' },
      { name: 'Stable Diffusion', status: 'active', usage: 'Unlimited', trial: 'Always free' },
      { name: 'Leonardo AI', status: 'standby', usage: '0/150', trial: 'Free tier ready' },
      { name: 'Playground AI', status: 'standby', usage: '0/100', trial: 'Free trial ready' }
    ],
    video: [
      { name: 'Veo 3 (Google)', status: 'active', usage: '12/30', trial: '25 days left' },
      { name: 'Runway ML', status: 'standby', usage: '0/100', trial: 'Free trial ready' },
      { name: 'Pika Labs', status: 'standby', usage: '0/50', trial: 'Free tier ready' },
      { name: 'Stable Video', status: 'active', usage: '8/25', trial: 'Free tier' },
      { name: 'LumaAI', status: 'standby', usage: '0/30', trial: 'Free trial ready' },
      { name: 'Haiper AI', status: 'standby', usage: '0/40', trial: 'Free tier ready' }
    ],
    voice: [
      { name: 'ElevenLabs', status: 'active', usage: '234/10000', trial: 'Free tier' },
      { name: 'Murf AI', status: 'standby', usage: '0/120', trial: 'Free trial ready' },
      { name: 'Speechify', status: 'standby', usage: '0/100', trial: 'Free tier ready' },
      { name: 'Lovo AI', status: 'standby', usage: '0/50', trial: 'Free trial ready' }
    ],
    text: [
      { name: 'GPT-4 Turbo', status: 'active', usage: '456/1000', trial: 'Free tier' },
      { name: 'Claude 3.5', status: 'active', usage: '234/500', trial: 'Free tier' },
      { name: 'Gemini Pro', status: 'active', usage: '123/1000', trial: 'Free tier' },
      { name: 'Perplexity', status: 'standby', usage: '0/300', trial: 'Free tier ready' }
    ]
  };

  const contentTemplates = [
    {
      type: 'Business Content',
      template: 'Professional [ROLE] in [SETTING], [ACTION], [MOOD], [STYLE_PARAMETERS]',
      variations: 12,
      lastUsed: '2 hours ago'
    },
    {
      type: 'Educational Content',
      template: 'Knowledgeable presenter in [ENVIRONMENT], explaining [TOPIC], [GESTURE], [LIGHTING]',
      variations: 8,
      lastUsed: '4 hours ago'
    },
    {
      type: 'Entertainment Content',
      template: 'Charismatic host in [LOCATION], [ACTIVITY], [EXPRESSION], [CAMERA_ANGLE]',
      variations: 15,
      lastUsed: '1 hour ago'
    },
    {
      type: 'Affiliate Marketing',
      template: 'Confident marketer showcasing [PRODUCT], [BENEFITS], [CALL_TO_ACTION], [SETTING]',
      variations: 20,
      lastUsed: '30 min ago'
    }
  ];

  const dailyMetrics = {
    videosProduced: 47,
    dailyTarget: 50,
    qualityScore: 8.7,
    automationUptime: '99.2%',
    costSavings: '$15,340',
    continuousOperation: 'Active'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'standby': return 'text-blue-400 bg-blue-400/10';
      case 'completed': return 'text-purple-400 bg-purple-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'warning': return 'text-orange-400 bg-orange-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'warning': return AlertTriangle;
      default: return Clock;
    }
  };

  const ProviderGrid = ({ title, providers, icon: Icon }: any) => (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-blue-400" />
          <h4 className="font-semibold text-white">{title}</h4>
        </div>
      </div>
      <div className="p-4 space-y-3">
        {providers.map((provider: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                provider.status === 'active' ? 'bg-green-400' : 'bg-blue-400'
              }`}></div>
              <span className="text-gray-300 text-sm">{provider.name}</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">{provider.usage}</div>
              <div className="text-xs text-blue-400">{provider.trial}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Continuous AI Video Production Automation</h1>
        <p className="text-gray-400">24/7 autonomous workflow using 42+ free AI tools with automatic failover and scaling</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Video className="h-8 w-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{dailyMetrics.videosProduced}</div>
              <div className="text-sm text-gray-400">Videos Produced</div>
              <div className="text-xs text-green-400">Daily Target: {dailyMetrics.dailyTarget}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{dailyMetrics.qualityScore}</div>
              <div className="text-sm text-gray-400">Quality Score</div>
              <div className="text-xs text-blue-400">Out of 10</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{dailyMetrics.automationUptime}</div>
              <div className="text-sm text-gray-400">Uptime</div>
              <div className="text-xs text-purple-400">Last 30 days</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">{dailyMetrics.trialDaysRemaining}</div>
              <div className="text-sm text-gray-400">Trial Days Left</div>
              <div className="text-xs text-yellow-400">Across all platforms</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">∞</div>
              <div className="text-sm text-gray-400">Continuous Operation</div>
              <div className="text-xs text-green-400">24/7 autonomous</div>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Phases */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Automation Workflow Phases</h3>
        </div>
        
        <div className="p-6">
          <div className="grid gap-4">
            {workflowPhases.map((phase, index) => {
              const StatusIcon = getStatusIcon(phase.status);
              return (
                <div 
                  key={phase.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    activePhase === phase.id ? 'border-blue-500 bg-blue-500/5' : 'border-gray-600'
                  }`}
                  onClick={() => setActivePhase(phase.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getStatusColor(phase.status)}`}>
                        <StatusIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{phase.name}</h4>
                        <p className="text-gray-400 text-sm">{phase.duration}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(phase.status)}`}>
                      {phase.status.toUpperCase()}
                    </div>
                  </div>
                  
                  {activePhase === phase.id && (
                    <div className="space-y-2">
                      {phase.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Provider Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProviderGrid title="Image Generation" providers={aiProviders.image} icon={Image} />
        <ProviderGrid title="Video Generation" providers={aiProviders.video} icon={Video} />
        <ProviderGrid title="Voice Generation" providers={aiProviders.voice} icon={Mic} />
        <ProviderGrid title="Text Generation" providers={aiProviders.text} icon={FileText} />
      </div>

      {/* Content Templates */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Content Templates & Variations</h3>
          <p className="text-sm text-gray-400 mt-1">Dynamic prompt templates for content variety</p>
        </div>
        
        <div className="divide-y divide-gray-700">
          {contentTemplates.map((template, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-medium">{template.type}</h4>
                  <p className="text-gray-400 text-sm mt-1">{template.template}</p>
                </div>
                <div className="text-right">
                  <div className="text-blue-400 font-semibold">{template.variations}</div>
                  <div className="text-xs text-gray-400">Variations</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">Last used: {template.lastUsed}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Automation Controls</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Start Workflow</span>
              </button>
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Pause className="h-4 w-4" />
                <span>Pause All</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Refresh Status</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </button>
            </div>
            
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">Autonomous Mode Active</span>
              </div>
              <p className="text-sm text-gray-300">System running independently for 30 days. Next video generation in 2h 15min.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Failover Management</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active Providers</span>
              <span className="text-green-400 font-semibold">24/26</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Standby Providers</span>
              <span className="text-blue-400 font-semibold">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Auto-Failover Events</span>
              <span className="text-yellow-400 font-semibold">3 today</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Cost Savings</span>
              <span className="text-green-400 font-semibold">{dailyMetrics.costSavings}</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Trial Usage Optimization</div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '73%'}}></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">73% efficiency across all free tiers</div>
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Today's Automation Schedule</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Content Discovery</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">YouTube Trending</span>
                  <span className="text-green-400">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Instagram Reels</span>
                  <span className="text-green-400">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">TikTok Viral</span>
                  <span className="text-yellow-400">In Progress</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">AI Generation</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Image Creation</span>
                  <span className="text-green-400">✓ Complete</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Video Generation</span>
                  <span className="text-yellow-400">Processing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Voice Overlay</span>
                  <span className="text-gray-500">Queued</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Publishing</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">YouTube Upload</span>
                  <span className="text-gray-500">Scheduled 6:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SEO Optimization</span>
                  <span className="text-gray-500">Queued</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Analytics Setup</span>
                  <span className="text-gray-500">Queued</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationWorkflow;