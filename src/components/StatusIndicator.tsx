
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'pending' | 'active' | 'completed' | 'stopped';

interface StatusIndicatorProps {
  status: StatusType;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, className }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-amber-400';
      case 'active':
        return 'bg-emerald-500 animate-pulse-soft';
      case 'completed':
        return 'bg-blue-500';
      case 'stopped':
        return 'bg-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'stopped':
        return 'Stopped';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={cn("flex items-center space-x-1.5", className)}>
      <div className={cn("status-dot", getStatusColor())} />
      <span className="text-xs text-gray-600 font-medium">{getStatusText()}</span>
    </div>
  );
};

export default StatusIndicator;
