
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    // Update document title
    document.title = "CartGenius - Recover Abandoned Carts";
  }, []);

  // Redirect to the dashboard
  return <Navigate to="/" replace />;
};

export default Index;
