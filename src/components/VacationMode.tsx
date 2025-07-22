import React, { useState } from 'react';
import { 
  Plane, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Shield,
  Zap,
  Target,
  TrendingUp,
  DollarSign,
  Bot,
  Settings,
  Play,
  Pause
} from 'lucide-react';

const VacationMode = () => {
  const [systemActive, setSystemActive] = useState(true);
  const [operationMode, setOperationMode] = useState('continuous');

  const systemSettings = {
    startDate: '2025-01-15',
    operationMode: 'Continuous',
    daysRunning: 5,
    automationLevel: 'Full Autonomous',
    backupSystems: 'Active',
    emergencyContacts: 'Configured'
  };

  const autonomousFeatures = [
    {
      name: 'Content Discovery & Scraping',
      description: 'Continuously finds trending videos 500K+ views across all platforms 24/7',
      status: 'active',
      reliability: '99.2%',
      lastCheck: '2 min ago'
    },
    {
      name: 'AI Content Generation',
      description: 'Continuously creates videos using 42+ free AI providers with smart failover',
      status: 'active',
      reliability: '96.8%',
      lastCheck: '5 min ago'
    },
    {
      name: 'Automated Publishing',
      description: 'Continuously uploads to all platforms using public APIs 24/7',
      status: 'active',
      reliability: '98.1%',
      lastCheck: '1 min ago'
    },
    {
      name: 'Revenue Optimization',
      description: 'Continuously monitors affiliate performance and optimizes strategies',
      status: 'active',
      reliability: '94.7%',
      lastCheck: '30 sec ago'
    },
    {
      name: 'System Health Monitoring',
      description: 'Continuous self-diagnostics and automatic error recovery 24/7',
      status: 'active',
      reliability: '99.8%',
      lastCheck: 'Continuous'
    },
    {
      name: 'Free Tier Management',
      description: 'Continuously optimizes usage across all free AI services with auto-scaling',
      status: 'active',
      reliability: '97.3%',
      lastCheck: '3 min ago'
    }
  ];

  const operationMetrics = {
    videosGenerated: 1247,
    dailyTarget: 30,
    revenueGenerated: '$23,456',
    monthlyTarget: '$1,000,000',
    systemUptime: '99.4%',
    costSavings: '$45,600'
  };

  const emergencyProtocols = [
    {
      scenario: 'API Rate Limits Exceeded',
      action: 'Auto-switch to backup providers',
      status: 'configured',
      lastTriggered: 'Never'
    },
    {
      scenario: 'Content Generation Failure',
      action: 'Use pre-generated content library',
      status: 'configured',
      lastTriggered: '3 days ago'
    },
    {
      scenario: 'Platform Upload Issues',
      action: 'Queue content and retry with delays',
      status: 'configured',
      lastTriggered: '1 week ago'
    },
    {
      scenario: 'Revenue Drop Detection',
      action: 'Activate high-performing backup campaigns',
      status: 'configured',
      lastTriggered: 'Never'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'configured': return 'text-blue-400 bg-blue-400/10';
      case 'warning': return 'text-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Continuous Autonomous Operation</h1>
        <p className="text-gray-400">24/7 fully automated AI affiliate marketing system running indefinitely</p>
      </div>

      {/* System Status */}
      <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Zap className="h-8 w-8 text-green-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">Continuous Operation Active</h3>
              <p className="text-green-300">System running autonomously 24/7 since {systemSettings.startDate}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{systemSettings.daysRunning}</div>
            <div className="text-sm text-green-300">Days running</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-green-300">Operation Mode</div>
            <div className="text-white font-semibold">{systemSettings.operationMode}</div>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-green-300">Backup Systems</div>
            <div className="text-green-400 font-semibold">{systemSettings.backupSystems}</div>
          </div>
          <div className="bg-black/20 rounded-lg p-4">
            <div className="text-sm text-green-300">Emergency Protocols</div>
            <div className="text-green-400 font-semibold">{systemSettings.emergencyContacts}</div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-white">{operationMetrics.videosGenerated}</div>
              <div className="text-sm text-gray-400">Videos Generated</div>
              <div className="text-xs text-green-400">Daily Target: {operationMetrics.dailyTarget}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-8 w-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-white">{operationMetrics.revenueGenerated}</div>
              <div className="text-sm text-gray-400">Revenue Generated</div>
              <div className="text-xs text-yellow-400">Monthly Target: {operationMetrics.monthlyTarget}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-blue-400" />
            <div>
              <div className="text-2xl font-bold text-white">{operationMetrics.systemUptime}</div>
              <div className="text-sm text-gray-400">System Uptime</div>
              <div className="text-xs text-blue-400">Last 30 days</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8 text-purple-400" />
            <div>
              <div className="text-2xl font-bold text-white">{operationMetrics.costSavings}</div>
              <div className="text-sm text-gray-400">Cost Savings</div>
              <div className="text-xs text-purple-400">Lifetime free usage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Autonomous Features */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Autonomous System Features</h3>
          <p className="text-sm text-gray-400 mt-1">All systems running continuously 24/7 without human intervention</p>
        </div>
        
        <div className="divide-y divide-gray-700">
          {autonomousFeatures.map((feature, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getStatusColor(feature.status)}`}>
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{feature.name}</h4>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">{feature.reliability}</div>
                  <div className="text-xs text-gray-400">Reliability</div>
                  <div className="text-xs text-gray-500 mt-1">Last check: {feature.lastCheck}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Protocols */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Emergency Protocols & Failsafes</h3>
          <p className="text-sm text-gray-400 mt-1">Automated responses to potential issues during continuous operation</p>
        </div>
        
        <div className="divide-y divide-gray-700">
          {emergencyProtocols.map((protocol, index) => (
            <div key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{protocol.scenario}</h4>
                    <p className="text-gray-400 text-sm">{protocol.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-2 py-1 rounded text-xs ${getStatusColor(protocol.status)}`}>
                    {protocol.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Last: {protocol.lastTriggered}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Continuous Operation Controls</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Operation Mode
              </label>
              <select 
                value={operationMode} 
                onChange={(e) => setOperationMode(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded-lg"
              >
                <option value="continuous">Continuous 24/7</option>
                <option value="scheduled">Scheduled Hours</option>
                <option value="burst">Burst Mode</option>
                <option value="maintenance">Maintenance Mode</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSystemActive(!systemActive)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                  systemActive 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {systemActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{systemActive ? 'Pause System' : 'Start System'}</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configure</span>
              </button>
            </div>
            
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">Continuous Operation</span>
              </div>
              <p className="text-sm text-gray-300">System operates continuously 24/7 using only free AI services with automatic scaling</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Continuous Operation Metrics</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Daily Video Output</span>
              <span className="text-white font-semibold">30-50 videos</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Monthly Revenue Target</span>
              <span className="text-green-400 font-semibold">$1,000,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Monthly Cost Savings</span>
              <span className="text-blue-400 font-semibold">$15,000+</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">System Reliability</span>
              <span className="text-purple-400 font-semibold">99.8%</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="text-sm text-gray-400 mb-2">Monthly Revenue Progress</div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" 
                style={{width: '2.3%'}}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              $23,456 of $1,000,000 target - 2.3% complete this month
            </div>
          </div>
        </div>
      </div>

      {/* System Health Dashboard */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Real-Time System Health</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Content Pipeline</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Scraping Active</span>
                  <span className="text-green-400">✓ Running</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Generation</span>
                  <span className="text-green-400">✓ Processing</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Upload Queue</span>
                  <span className="text-blue-400">8 pending</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">AI Providers</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Providers</span>
                  <span className="text-green-400">38/42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Failover Events</span>
                  <span className="text-yellow-400">3 today</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate</span>
                  <span className="text-green-400">96.8%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-300">Revenue Tracking</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Today's Revenue</span>
                  <span className="text-green-400">$432</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Conversion Rate</span>
                  <span className="text-blue-400">4.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Scaling Status</span>
                  <span className="text-purple-400">Auto-scaling</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VacationMode;