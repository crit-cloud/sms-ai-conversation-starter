
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Clock, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lead, Message, getMessagesForThread, formatDate } from '@/utils/mockData';
import { Separator } from '@/components/ui/separator';
import { staggerChildren, staggerItem } from '@/utils/animations';

interface ConversationViewProps {
  lead: Lead;
}

const ConversationView: React.FC<ConversationViewProps> = ({ lead }) => {
  const messages = lead.thread_id ? getMessagesForThread(lead.thread_id) : [];
  const [messageText, setMessageText] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the message
    setMessageText('');
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">{lead.email.split('@')[0]}</h2>
            <p className="text-sm text-gray-500">{lead.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{lead.city}</p>
            <p className="text-sm text-gray-500">{lead.price}</p>
          </div>
        </div>
      </div>

      {lead.thread_id ? (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length > 0 ? (
              <motion.div
                variants={staggerChildren}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {messages.map((message) => (
                  <motion.div 
                    key={message.id} 
                    variants={staggerItem}
                    className={`flex ${message.isAI ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.isAI
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-primary text-white'
                      }`}
                    >
                      <div className="flex items-center mb-1 space-x-1">
                        {message.isAI ? (
                          <Bot className="h-3 w-3" />
                        ) : (
                          <User className="h-3 w-3" />
                        )}
                        <span className="text-xs font-medium">
                          {message.isAI ? 'Assistant' : 'User'}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 text-right mt-1">
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">No messages yet</p>
                </div>
              </div>
            )}
          </div>

          {lead.status !== 'stopped' && (
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  disabled={lead.stopRequested}
                />
                <Button type="submit" disabled={!messageText.trim() || lead.stopRequested}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {lead.stopRequested && (
                <p className="text-xs text-red-500 mt-2">
                  User has opted out of messages
                </p>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md p-6">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Conversation starting soon</h3>
            <p className="text-sm text-gray-500 mb-4">
              The AI assistant will begin the conversation in approximately {lead.status === 'pending' ? '5 minutes' : 'a few moments'} after the lead was received.
            </p>
            <Separator className="my-4" />
            <div className="text-sm text-gray-500 space-y-2">
              <p>Lead details:</p>
              <ul className="space-y-1 text-left list-disc pl-5">
                <li>Budget: {lead.price}</li>
                <li>City: {lead.city}</li>
                <li>Date Range: {new Date(lead.res_start_date).toLocaleDateString()} - {new Date(lead.res_end_date).toLocaleDateString()}</li>
                {lead.numRooms && <li>Rooms: {lead.numRooms}</li>}
                {lead.location && <li>Location: {lead.location}</li>}
                {lead.maxBudget && <li>Max Budget: ${lead.maxBudget}</li>}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationView;
