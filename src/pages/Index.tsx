
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, RefreshCcw, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import LeadCard from '@/components/LeadCard';
import ConversationView from '@/components/ConversationView';
import StatusIndicator from '@/components/StatusIndicator';
import { mockLeads } from '@/utils/mockData';
import { fadeIn, slideUp } from '@/utils/animations';

const Index = () => {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = 
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
      lead.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
      
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const selectedLead = mockLeads.find(lead => lead.id === selectedLeadId);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-1/3 border-r border-gray-200 bg-white flex flex-col overflow-hidden"
        >
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search leads..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="icon" variant="outline">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
                <TabsTrigger value="active" className="flex-1">Active</TabsTrigger>
                <TabsTrigger value="completed" className="flex-1">Complete</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    isSelected={lead.id === selectedLeadId}
                    onClick={() => setSelectedLeadId(lead.id)}
                  />
                ))
              ) : (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={slideUp}
                  className="flex flex-col items-center justify-center h-48 text-gray-500"
                >
                  <Search className="h-8 w-8 mb-2 text-gray-400" />
                  <p className="text-sm">No leads match your search</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="p-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs font-medium text-gray-500">TOTAL LEADS</p>
                <p className="text-lg font-semibold">{mockLeads.length}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  New Test Lead
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Main Content */}
        <motion.div 
          layout 
          className="flex-1 bg-white"
        >
          {selectedLead ? (
            <ConversationView lead={selectedLead} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-md p-8">
                <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Select a Lead</h2>
                <p className="text-gray-500 mb-6">
                  Choose a lead from the sidebar to view or start a conversation.
                </p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <StatusIndicator status="active" className="mx-auto mb-2 justify-center" />
                    <p className="text-sm text-gray-600">{mockLeads.filter(l => l.status === 'active').length} active</p>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-3">
                    <StatusIndicator status="pending" className="mx-auto mb-2 justify-center" />
                    <p className="text-sm text-gray-600">{mockLeads.filter(l => l.status === 'pending').length} pending</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
