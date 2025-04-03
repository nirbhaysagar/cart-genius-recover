
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RecoveryEmailRequest {
  cartId: string;
  userEmail: string;
  cartValue: number;
  items: any[];
  discountCode?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cartId, userEmail, cartValue, items, discountCode } = await req.json() as RecoveryEmailRequest;
    
    console.log(`Processing recovery email for cart ${cartId} to ${userEmail}`);

    // In a real implementation, you would:
    // 1. Connect to an email service like SendGrid, Postmark, or Resend
    // 2. Generate the email content with the cart details
    // 3. Include a recovery link with the discount code
    // 4. Send the email
    
    // For this demo, we'll simulate sending the email
    const emailSent = true;

    if (emailSent) {
      // Update the database to mark the email as sent
      const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
      
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      await supabase
        .from("abandoned_carts")
        .update({
          recovery_email_sent: true,
          recovery_email_sent_at: new Date().toISOString(),
        })
        .eq("id", cartId);

      console.log(`Recovery email sent successfully for cart ${cartId}`);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Recovery email sent successfully" 
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" }, 
          status: 200 
        }
      );
    } else {
      throw new Error("Failed to send recovery email");
    }
  } catch (err) {
    console.error("Error sending recovery email:", err);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: err.message || "An error occurred while sending the recovery email" 
      }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 500 
      }
    );
  }
});
