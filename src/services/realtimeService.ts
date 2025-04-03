
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

interface SubscribeToTableProps {
  table: string;
  schema?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  handler: (payload: any) => void;
  filter?: string;
  filterValue?: any;
}

export function subscribeToTable({
  table,
  schema = 'public',
  event = '*',
  handler,
  filter,
  filterValue,
}: SubscribeToTableProps): () => void {
  let channel: RealtimeChannel;
  
  try {
    // Define the channel configuration
    const channelConfig = {
      event,
      schema,
      table,
    };
    
    // Add filter if provided
    if (filter && filterValue !== undefined) {
      Object.assign(channelConfig, { filter: `${filter}=eq.${filterValue}` });
    }
    
    // Subscribe to the channel
    channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes' as any,
        channelConfig,
        handler
      )
      .subscribe();
      
    // Return the unsubscribe function
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  } catch (error) {
    console.error('Error subscribing to table:', error);
    // Return a no-op function if there was an error
    return () => {};
  }
}

export function subscribeToUserPresence(roomId: string, userId: string, userInfo: any): () => void {
  try {
    const channel = supabase.channel(`presence-${roomId}`);
    
    channel
      .on('presence', { event: 'sync' }, () => {
        const state = channel.presenceState();
        console.log('Presence sync:', state);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({
            user_id: userId,
            ...userInfo,
            online_at: new Date().toISOString(),
          });
        }
      });
    
    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  } catch (error) {
    console.error('Error subscribing to presence:', error);
    return () => {};
  }
}
