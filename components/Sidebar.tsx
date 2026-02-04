import React from 'react';
import { LayoutDashboard, CalendarDays, Mail, History, Shield } from 'lucide-react';

interface SidebarProps {
  activeView: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView }) => {
  return (
    <aside className="w-64 flex flex-col justify-between bg-white border-r border-gray-200 p-4 h-full hidden md:flex">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col px-3">
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-6 h-6 text-primary fill-current" />
            <h1 className="text-primary text-lg font-bold leading-normal">Allianz Manager</h1>
          </div>
          <p className="text-text-sub text-xs font-normal uppercase tracking-wider pl-8">Agent Portal</p>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-sub hover:bg-bg-light transition-colors cursor-pointer group">
            <LayoutDashboard size={20} />
            <p className="text-sm font-medium">Overview</p>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary/10 text-secondary transition-colors cursor-pointer">
            <CalendarDays size={20} />
            <p className="text-sm font-bold">Calendar</p>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-sub hover:bg-bg-light transition-colors cursor-pointer group">
            <Mail size={20} />
            <p className="text-sm font-medium">Email Templates</p>
          </div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-sub hover:bg-bg-light transition-colors cursor-pointer group">
            <History size={20} />
            <p className="text-sm font-medium">History</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-secondary/5 rounded-xl border border-secondary/10">
        <p className="text-xs font-bold text-secondary mb-1">PRO TIP</p>
        <p className="text-[11px] text-text-sub leading-relaxed">
          You have 12 automated birthday emails scheduled for today.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;