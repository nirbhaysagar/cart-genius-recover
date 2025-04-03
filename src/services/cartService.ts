
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface AbandonedCartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface AbandonedCart {
  id: string;
  user_email: string;
  cart_value: number;
  items: AbandonedCartItem[];
  abandoned_at: string;
  recovered: boolean;
  recovery_email_sent: boolean;
  recovery_email_sent_at: string | null;
  recovery_email_opened: boolean;
}

export async function getAbandonedCarts(): Promise<AbandonedCart[]> {
  try {
    const { data, error } = await supabase
      .from('abandoned_carts')
      .select('*')
      .order('abandoned_at', { ascending: false }) as { 
        data: AbandonedCart[] | null;
        error: Error | null;
      };

    if (error) {
      toast({
        title: "Error fetching carts",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error fetching abandoned carts:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Unexpected error fetching abandoned carts:', err);
    return [];
  }
}

export async function addAbandonedCart(cart: Omit<AbandonedCart, 'id'>): Promise<AbandonedCart | null> {
  try {
    const { data, error } = await supabase
      .from('abandoned_carts')
      .insert([cart])
      .select()
      .single() as {
        data: AbandonedCart | null;
        error: Error | null;
      };

    if (error) {
      toast({
        title: "Error adding cart",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error adding abandoned cart:', error);
      return null;
    }

    toast({
      title: "Cart saved",
      description: "Abandoned cart has been logged successfully",
    });
    
    return data;
  } catch (err) {
    console.error('Unexpected error adding abandoned cart:', err);
    return null;
  }
}

export async function markCartAsRecovered(cartId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('abandoned_carts')
      .update({ recovered: true })
      .eq('id', cartId) as {
        error: Error | null;
      };

    if (error) {
      toast({
        title: "Error updating cart",
        description: error.message,
        variant: "destructive",
      });
      console.error('Error marking cart as recovered:', error);
      return false;
    }

    toast({
      title: "Cart recovered",
      description: "Cart has been marked as recovered",
    });
    
    return true;
  } catch (err) {
    console.error('Unexpected error marking cart as recovered:', err);
    return false;
  }
}
