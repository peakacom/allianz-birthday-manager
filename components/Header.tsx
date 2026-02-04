import React from 'react';
import { Search, Bell, Settings } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 bg-white px-8 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-8 w-full max-w-xl">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-text-sub" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border-none rounded-lg leading-5 bg-bg-light text-text-main placeholder-text-sub focus:outline-none focus:ring-1 focus:ring-secondary sm:text-sm"
            placeholder="Search policyholders..."
          />
        </div>
      </div>
      
      <div className="flex flex-1 justify-end gap-6 items-center">
        <nav className="hidden lg:flex items-center gap-6">
          <a className="text-text-main text-sm font-medium hover:text-secondary transition-colors" href="#">Dashboard</a>
          <a className="text-text-main text-sm font-medium hover:text-secondary transition-colors" href="#">Customers</a>
          <a className="text-text-main text-sm font-medium hover:text-secondary transition-colors" href="#">Automations</a>
          <a className="text-text-main text-sm font-medium hover:text-secondary transition-colors" href="#">Reports</a>
        </nav>
        
        <div className="flex gap-2 items-center border-l border-gray-200 pl-6">
          <button className="flex items-center justify-center rounded-lg h-9 w-9 text-text-main hover:bg-bg-light transition-colors">
            <Bell size={20} />
          </button>
          <button className="flex items-center justify-center rounded-lg h-9 w-9 text-text-main hover:bg-bg-light transition-colors">
            <Settings size={20} />
          </button>
          <div className="ml-2 h-9 w-9 rounded-full bg-indigo-100 border-2 border-white ring-2 ring-secondary/20 overflow-hidden">
             <img src="https://picsum.photos/100/100" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;