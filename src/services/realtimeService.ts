
import { supabase } from "@/integrations/supabase/client";
import { RealtimeChannel } from "@supabase/supabase-js";

export type DataChangeHandler = (payload: any) => void;

interface RealtimeSubscription {
  table: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  handler: DataChangeHandler;
}

// Cache for active channels to prevent duplicates
const activeChannels: Record<string, RealtimeChannel> = {};

/**
 * Subscribe to real-time changes on a Supabase table
 */
export function subscribeToTable({
  table,
  event = '*',
  handler
}: RealtimeSubscription): () => void {
  
  const channelKey = `${table}:${event}`;
  
  // Reuse existing channel if available
  if (activeChannels[channelKey]) {
    const existingChannel = activeChannels[channelKey];
    existingChannel.on('postgres_changes', { 
      event: event, 
      schema: 'public', 
      table: table 
    }, handler);
    
    return () => {
      existingChannel.unsubscribe();
      delete activeChannels[channelKey];
    };
  }

  // Create a new channel
  const channel = supabase
    .channel(`public:${table}:${event}`)
    .on('postgres_changes', { 
      event: event, 
      schema: 'public', 
      table: table 
    }, handler)
    .subscribe();
    
  activeChannels[channelKey] = channel;
    
  // Return cleanup function
  return () => {
    supabase.removeChannel(channel);
    delete activeChannels[channelKey];
  };
}

/**
 * Subscribe to multiple tables with a single function
 */
export function subscribeToMultipleTables(
  subscriptions: RealtimeSubscription[]
): () => void {
  const unsubscribeFunctions = subscriptions.map(subscription => 
    subscribeToTable(subscription)
  );
  
  return () => {
    unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
  };
}
