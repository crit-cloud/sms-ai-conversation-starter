
import React from 'react';
import { MessageSquare, Settings, Bell } from "lucide-react";
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center animate-fade-in">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-medium text-gray-900">SMS AI Assistant</h1>
        <Badge variant="secondary" className="ml-2 font-normal">Beta</Badge>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-all-200 cursor-pointer" />
          <div className="absolute -top-1 -right-1 bg-primary w-2 h-2 rounded-full"></div>
        </div>
        <Settings className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-all-200 cursor-pointer" />
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-sm font-medium">
          AA
        </div>
      </div>
    </header>
  );
}

export default Header;
