
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Calendar, MapPin } from 'lucide-react';
import StatusIndicator from './StatusIndicator';
import { cn } from '@/lib/utils';
import { Lead, formatTimeSince } from '@/utils/mockData';

interface LeadCardProps {
  lead: Lead;
  isSelected: boolean;
  onClick: () => void;
}

const LeadCard: React.FC<LeadCardProps> = ({ lead, isSelected, onClick }) => {
  const cardVariants = {
    hover: { y: -2, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)' },
    tap: { scale: 0.995 }
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={cn(
        'p-4 rounded-lg border transition-all cursor-pointer',
        isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white hover:border-gray-300',
        'animate-slide-up'
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium text-gray-900">{lead.email.split('@')[0]}</p>
          <p className="text-sm text-gray-500">{lead.email}</p>
        </div>
        <StatusIndicator status={lead.status} />
      </div>
      
      <div className="flex flex-col space-y-2 mt-3">
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{lead.city}{lead.zip ? `, ${lead.zip}` : ''}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {new Date(lead.res_start_date).toLocaleDateString()} - {new Date(lead.res_end_date).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {lead.messageCount || 0} message{lead.messageCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {lead.lastMessageTime && (
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Last activity: {formatTimeSince(lead.lastMessageTime)}
          </p>
        </div>
      )}

      {lead.status === 'pending' && (
        <div className="mt-2">
          <div className="bg-amber-50 text-amber-700 text-xs rounded px-2 py-1 inline-flex items-center">
            <span>Starting conversation soon</span>
          </div>
        </div>
      )}

      {lead.stopRequested && (
        <div className="mt-2">
          <div className="bg-red-50 text-red-700 text-xs rounded px-2 py-1 inline-flex items-center">
            <span>User opted out</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LeadCard;
