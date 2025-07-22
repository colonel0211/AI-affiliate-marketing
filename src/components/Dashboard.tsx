import React, { useState, useEffect } from 'react';
import SystemOverview from './SystemOverview';
import AIAgents from './AIAgents';
import ContentPipeline from './ContentPipeline';
import RevenueTracking from './RevenueTracking';
import CampaignScheduler from './CampaignScheduler';
import PlatformStatus from './PlatformStatus';
import AIProviderStatus from './AIProviderStatus';
import AutomationWorkflow from './AutomationWorkflow';
import FreeAIProviders from './FreeAIProviders';
import VacationMode from './VacationMode';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'System Overview', component: SystemOverview },
    { id: 'agents', label: 'AI Agents', component: AIAgents },
    { id: 'pipeline', label: 'Content Pipeline', component: ContentPipeline },
    { id: 'revenue', label: 'Revenue Tracking', component: RevenueTracking },
    { id: 'campaigns', label: 'Campaigns', component: CampaignScheduler },
    { id: 'platforms', label: 'Platform Status', component: PlatformStatus },
    { id: 'ai-providers', label: 'AI Providers', component: AIProviderStatus },
    { id: 'automation', label: 'Daily Automation', component: AutomationWorkflow },
    { id: 'free-providers', label: 'Free AI Network', component: FreeAIProviders },
    { id: 'vacation', label: 'Continuous Operation', component: VacationMode }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SystemOverview;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-white mb-4">Control Panel</h2>
          <nav className="space-y-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;