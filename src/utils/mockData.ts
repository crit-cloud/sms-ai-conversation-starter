
export type LeadStatus = 'pending' | 'active' | 'completed' | 'stopped';

export interface Lead {
  id: string;
  email: string;
  city: string;
  price: string;
  res_start_date: string;
  res_end_date: string;
  phone: string;
  status: LeadStatus;
  timestamp: string;
  lastMessageTime?: string;
  numRooms?: string;
  maxBudget?: number;
  zip?: number;
  location?: string;
  multipleUnits?: boolean;
  corporate?: boolean;
  unitDetails?: string;
  bookBy?: string;
  thread_id?: string;
  stopRequested?: boolean;
  messageCount?: number;
}

export interface Message {
  id: string;
  threadId: string;
  content: string;
  timestamp: string;
  isAI: boolean;
}

// Mock data for leads
export const mockLeads: Lead[] = [
  {
    id: '1',
    email: 'johndoe@example.com',
    city: 'Atlanta',
    price: 'Under $2,999',
    res_start_date: '03/19/2025',
    res_end_date: '06/19/2025',
    phone: '1234567890',
    status: 'active',
    timestamp: '2023-11-15T14:30:00Z',
    lastMessageTime: '2023-11-15T15:45:00Z',
    numRooms: '2',
    maxBudget: 2500,
    zip: 30303,
    location: 'Downtown',
    multipleUnits: false,
    corporate: true,
    thread_id: 'thread_123456',
    messageCount: 4
  },
  {
    id: '2',
    email: 'alice@example.com',
    city: 'New York',
    price: 'Under $3,500',
    res_start_date: '04/01/2025',
    res_end_date: '07/31/2025',
    phone: '2345678901',
    status: 'pending',
    timestamp: new Date(Date.now() - 4 * 60 * 1000).toISOString(), // 4 minutes ago
    numRooms: '1',
    maxBudget: 3200,
    zip: 10001,
    location: 'Midtown',
    messageCount: 0
  },
  {
    id: '3',
    email: 'bob@example.com',
    city: 'Chicago',
    price: 'Under $2,500',
    res_start_date: '05/15/2025',
    res_end_date: '08/15/2025',
    phone: '3456789012',
    status: 'completed',
    timestamp: '2023-11-10T09:15:00Z',
    lastMessageTime: '2023-11-12T11:20:00Z',
    numRooms: '3',
    maxBudget: 2350,
    zip: 60601,
    thread_id: 'thread_789012',
    messageCount: 12
  },
  {
    id: '4',
    email: 'carol@example.com',
    city: 'San Francisco',
    price: 'Under $4,000',
    res_start_date: '06/01/2025',
    res_end_date: '12/31/2025',
    phone: '4567890123',
    status: 'stopped',
    timestamp: '2023-11-08T16:45:00Z',
    lastMessageTime: '2023-11-09T10:30:00Z',
    numRooms: '2',
    maxBudget: 3800,
    zip: 94105,
    stopRequested: true,
    thread_id: 'thread_345678',
    messageCount: 3
  },
  {
    id: '5',
    email: 'dave@example.com',
    city: 'Boston',
    price: 'Under $3,200',
    res_start_date: '03/01/2025',
    res_end_date: '09/30/2025',
    phone: '5678901234',
    status: 'active',
    timestamp: '2023-11-14T08:20:00Z',
    lastMessageTime: '2023-11-15T17:10:00Z',
    numRooms: '1',
    maxBudget: 3000,
    zip: 2108, // Fixed: removed leading zero
    thread_id: 'thread_901234',
    messageCount: 7
  }
];

// Mock data for messages
export const mockMessages: Record<string, Message[]> = {
  'thread_123456': [
    {
      id: 'm1',
      threadId: 'thread_123456',
      content: 'Hi! I noticed you\'re looking for a 2-bedroom rental in Atlanta starting March 2025. Is that correct?',
      timestamp: '2023-11-15T14:35:00Z',
      isAI: true
    },
    {
      id: 'm2',
      threadId: 'thread_123456',
      content: 'Yes, that\'s right. Looking for something downtown.',
      timestamp: '2023-11-15T14:45:00Z',
      isAI: false
    },
    {
      id: 'm3',
      threadId: 'thread_123456',
      content: 'Great! What\'s your budget range, and do you need any specific amenities?',
      timestamp: '2023-11-15T14:50:00Z',
      isAI: true
    },
    {
      id: 'm4',
      threadId: 'thread_123456',
      content: 'My budget is around $2500. I\'d like a gym and parking if possible.',
      timestamp: '2023-11-15T15:45:00Z',
      isAI: false
    }
  ],
  'thread_789012': [],
  'thread_345678': [
    {
      id: 'm5',
      threadId: 'thread_345678',
      content: 'Hello! I see you\'re interested in a rental in San Francisco. How can I help you today?',
      timestamp: '2023-11-09T09:00:00Z',
      isAI: true
    },
    {
      id: 'm6',
      threadId: 'thread_345678',
      content: 'I\'m looking for information about apartment availability.',
      timestamp: '2023-11-09T09:15:00Z',
      isAI: false
    },
    {
      id: 'm7',
      threadId: 'thread_345678',
      content: 'STOP',
      timestamp: '2023-11-09T10:30:00Z',
      isAI: false
    }
  ],
  'thread_901234': [
    {
      id: 'm8',
      threadId: 'thread_901234',
      content: 'Hi there! I understand you\'re looking for a 1-bedroom rental in Boston starting March 2025. Is that correct?',
      timestamp: '2023-11-14T08:25:00Z',
      isAI: true
    },
    {
      id: 'm9',
      threadId: 'thread_901234',
      content: 'Yes, I am. Preferably in Downtown area.',
      timestamp: '2023-11-14T09:30:00Z',
      isAI: false
    },
    {
      id: 'm10',
      threadId: 'thread_901234',
      content: 'Excellent! Boston\'s downtown area has several options. What\'s your budget and do you have any must-have amenities?',
      timestamp: '2023-11-14T09:35:00Z',
      isAI: true
    },
    {
      id: 'm11',
      threadId: 'thread_901234',
      content: 'My budget is $3000 max. I need in-unit laundry and ideally close to public transit.',
      timestamp: '2023-11-14T10:40:00Z',
      isAI: false
    },
    {
      id: 'm12',
      threadId: 'thread_901234',
      content: 'Got it. There are several properties near T stations with in-unit laundry in your budget range. Do you have a preference between older buildings with character or newer developments?',
      timestamp: '2023-11-14T10:45:00Z',
      isAI: true
    },
    {
      id: 'm13',
      threadId: 'thread_901234',
      content: 'I prefer newer buildings.',
      timestamp: '2023-11-15T15:00:00Z',
      isAI: false
    },
    {
      id: 'm14',
      threadId: 'thread_901234',
      content: 'Perfect! There are several newer developments in Downtown Boston and Seaport area that match your criteria. Would you like me to send some specific options?',
      timestamp: '2023-11-15T17:10:00Z',
      isAI: true
    }
  ]
};

// Helper function to get messages for a thread
export const getMessagesForThread = (threadId: string): Message[] => {
  return mockMessages[threadId] || [];
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};

// Helper function to format time since
export const formatTimeSince = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
};
