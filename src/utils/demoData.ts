
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Json } from "@/integrations/supabase/types";

const sampleProducts = [
  { id: "p1", name: "Ultra HD Smart TV", price: 699.99, image: "/placeholder.svg" },
  { id: "p2", name: "Wireless Noise-Canceling Headphones", price: 249.99, image: "/placeholder.svg" },
  { id: "p3", name: "Smart Home Speaker", price: 129.99, image: "/placeholder.svg" },
  { id: "p4", name: "Smartphone Pro Max", price: 1099.99, image: "/placeholder.svg" },
  { id: "p5", name: "Gaming Console", price: 499.99, image: "/placeholder.svg" },
  { id: "p6", name: "Fitness Smartwatch", price: 199.99, image: "/placeholder.svg" },
  { id: "p7", name: "Wireless Earbuds", price: 159.99, image: "/placeholder.svg" },
  { id: "p8", name: "Tablet Pro", price: 799.99, image: "/placeholder.svg" },
];

const sampleEmails = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "robert.johnson@example.com",
  "sarah.williams@example.com",
  "michael.brown@example.com",
  "emily.davis@example.com",
  "david.miller@example.com",
  "emma.wilson@example.com",
];

function getRandomItems(min = 1, max = 4) {
  const numItems = Math.floor(Math.random() * (max - min + 1)) + min;
  const selectedItems = [];
  
  // Create a copy of the products to avoid duplicates
  const availableProducts = [...sampleProducts];
  
  for (let i = 0; i < numItems && availableProducts.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableProducts.length);
    const product = availableProducts.splice(randomIndex, 1)[0];
    
    selectedItems.push({
      ...product,
      quantity: Math.floor(Math.random() * 3) + 1,
    });
  }
  
  return selectedItems;
}

function getRandomDate(days = 30) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * days));
  return date.toISOString();
}

export async function generateDemoAbandonedCarts(count = 10) {
  try {
    const carts = [];
    
    for (let i = 0; i < count; i++) {
      const items = getRandomItems();
      const cartValue = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const email = sampleEmails[Math.floor(Math.random() * sampleEmails.length)];
      const abandoned_at = getRandomDate();
      
      // Randomly determine if the cart was recovered or had an email sent
      const recovered = Math.random() < 0.3;
      const recovery_email_sent = recovered ? true : Math.random() < 0.7;
      const recovery_email_sent_at = recovery_email_sent ? getRandomDate(15) : null;
      const recovery_email_opened = recovery_email_sent ? Math.random() < 0.5 : false;
      
      carts.push({
        user_email: email,
        cart_value: cartValue,
        items: items as unknown as Json,
        abandoned_at,
        recovered,
        recovery_email_sent,
        recovery_email_sent_at,
        recovery_email_opened
      });
    }
    
    // Insert the carts into the database
    const { error } = await supabase
      .from('abandoned_carts')
      .insert(carts) as {
        error: Error | null;
      };
      
    if (error) {
      console.error('Error generating demo carts:', error);
      toast({
        title: "Error generating demo data",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Demo data generated",
      description: `${count} abandoned carts have been created`,
    });
    
    return true;
  } catch (err) {
    console.error('Unexpected error generating demo data:', err);
    return false;
  }
}

export async function generateDemoCampaigns(count = 3) {
  try {
    const campaigns = [
      {
        name: "Welcome Back - 10% Discount",
        status: "active",
        channels: ["Email"],
        time_triggers: ["1 hour after abandonment"],
        message_templates: {
          subject: "Don't miss out on your items!",
          body: "We noticed you left some items in your cart. Here's a 10% discount to complete your purchase!",
        },
      },
      {
        name: "Last Chance - 15% Discount",
        status: "active",
        channels: ["Email", "SMS"],
        time_triggers: ["24 hours after abandonment", "48 hours after abandonment"],
        message_templates: {
          subject: "Last chance to complete your purchase!",
          body: "Your items are still waiting for you. Complete your purchase with a 15% discount!",
        },
      },
      {
        name: "VIP Recovery - 20% Discount",
        status: "draft",
        channels: ["Email", "SMS", "WhatsApp"],
        time_triggers: ["4 hours after abandonment", "1 day after abandonment", "3 days after abandonment"],
        message_templates: {
          subject: "VIP Offer Just For You",
          body: "As a valued customer, we're offering you a special 20% discount on your cart items!",
        },
      }
    ];
    
    // Insert the campaigns into the database
    const { error } = await supabase
      .from('recovery_campaigns')
      .insert(campaigns) as {
        error: Error | null;
      };
      
    if (error) {
      console.error('Error generating demo campaigns:', error);
      toast({
        title: "Error generating demo campaigns",
        description: error.message,
        variant: "destructive",
      });
      return false;
    }
    
    toast({
      title: "Demo campaigns generated",
      description: `${campaigns.length} recovery campaigns have been created`,
    });
    
    return true;
  } catch (err) {
    console.error('Unexpected error generating demo campaigns:', err);
    return false;
  }
}
