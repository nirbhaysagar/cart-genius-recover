
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface RecoveryCampaign {
  id: string;
  name: string;
  status: "active" | "draft" | "archived";
  channels: string[];
  time_triggers: string[];
  message_templates: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export async function getCampaigns(): Promise<RecoveryCampaign[]> {
  try {
    const { data, error } = await supabase
      .from('recovery_campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching campaigns",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error fetching recovery campaigns:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching recovery campaigns:', err);
    return [];
  }
}

export async function createCampaign(campaign: Omit<RecoveryCampaign, 'id' | 'created_at' | 'updated_at'>): Promise<RecoveryCampaign | null> {
  try {
    const { data, error } = await supabase
      .from('recovery_campaigns')
      .insert([campaign])
      .select()
      .single();

    if (error) {
      toast({
        title: "Error creating campaign",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error creating recovery campaign:', error);
      return null;
    }

    toast({
      title: "Campaign created",
      description: "Recovery campaign has been created successfully",
    });
    
    return data;
  } catch (err) {
    console.error('Unexpected error creating recovery campaign:', err);
    return null;
  }
}

export async function updateCampaignStatus(campaignId: string, status: "active" | "draft" | "archived"): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('recovery_campaigns')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', campaignId);

    if (error) {
      toast({
        title: "Error updating campaign",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error updating campaign status:', error);
      return false;
    }

    toast({
      title: "Campaign updated",
      description: `Campaign status changed to ${status}`,
    });
    
    return true;
  } catch (err) {
    console.error('Unexpected error updating campaign status:', err);
    return false;
  }
}
