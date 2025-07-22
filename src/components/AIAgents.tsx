import React from 'react';
import { 
  Search, 
  Video, 
  Calendar, 
  Bot,
  PlayCircle,
  PauseCircle,
  Settings,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const AIAgents = () => {
  const agents = [
    {
      name: 'Viral Video Hunter AI Agent',
      description: 'Finds trending videos with 500K+ views from Instagram, YouTube, TikTok',
      icon: Search,
      status: 'active',
      lastAction: 'Found 23 trending videos',
      nextAction: 'Scan in 45 minutes',
      tasks: [
        'Find top trending videos with 500K+ views on target SN',
        'Extract captions, engagement & trends metrics',
        'Take a screenshot at 1-3 seconds',
        'Download audio and transform to text',
        'Create a score out of 100 based on engagement',
        'Add data to Google Sheets'
      ],
      metrics: {
        videosScraped: '1,247',
        successRate: '94.2%',
        avgViews: '2.3M'
      }
    },
    {
      name: 'Video Creator AI Agent',
      description: 'Creates scripts based on templates and generates viral video clips',
      icon: Video,
      status: 'active',
      lastAction: 'Generated 8 videos',
      nextAction: 'Process queue in 12 minutes',
      tasks: [
        'Create scripts based on templates',
        'Add prompts to Google Sheets',
        'Generate videos using AI',
        'Save videos for distribution',
        'Create captions based on templates',
        'Update Google Sheets'
      ],
      metrics: {
        videosCreated: '892',
        processingTime: '4.2 min avg',
        qualityScore: '8.7/10'
      }
    },
    {
      name: 'Video Scheduler AI Agent',
      description: 'Creates posting calendar and schedules content for optimal engagement',
      icon: Calendar,
      status: 'active',
      lastAction: 'Scheduled 15 posts',
      nextAction: 'Upload batch in 1.5 hours',
      tasks: [
        'Create a posting calendar with time & dates',
        'Select content tagged "ready" for posting on Google Sheets',
        'Take video from database',
        'Upload to Instagram',
        'Update Google Sheets'
      ],
      metrics: {
        postsScheduled: '456',
        uploadSuccess: '98.1%',
        avgEngagement: '12.4%'
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'paused': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'paused': return PauseCircle;
      case 'error': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">AI Agents</h1>
        <p className="text-gray-400">Autonomous AI agents working 24/7 to generate affiliate revenue</p>
      </div>

      <div className="grid gap-6">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const StatusIcon = getStatusIcon(agent.status);
          
          return (
            <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-600 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                      <p className="text-gray-400 text-sm">{agent.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${getStatusColor(agent.status)}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">{agent.status}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <PlayCircle className="h-4 w-4 text-gray-300" />
                      </button>
                      <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <PauseCircle className="h-4 w-4 text-gray-300" />
                      </button>
                      <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                        <Settings className="h-4 w-4 text-gray-300" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Current Tasks</h4>
                    <div className="space-y-2">
                      {agent.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Performance Metrics</h4>
                    <div className="space-y-3">
                      {Object.entries(agent.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-white font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm text-gray-400">
                  <span>Last Action: {agent.lastAction}</span>
                  <span>Next: {agent.nextAction}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent Controls */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Agent Controls</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Start All Agents
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Pause All Agents
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Configure Agents
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgents;