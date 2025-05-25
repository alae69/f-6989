
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingsProvider } from "./contexts/BookingsContext";
import { PropertiesProvider } from "./contexts/PropertiesContext";
import AuthCheck from "./components/AuthCheck";
import Index from "./pages/Index";
import PropertyPage from "./pages/PropertyPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProperties from "./pages/AdminProperties";
import AdminBookings from "./pages/AdminBookings";
import AdminUsers from "./pages/AdminUsers";
import AdminSettings from "./pages/AdminSettings";
import AdminSystem from "./pages/AdminSystem";
import PropertiesPage from "./pages/PropertiesPage";
import OwnerDashboard from "./pages/OwnerDashboard"; // Import the new page
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BookingsProvider>
      <PropertiesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<Index />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/property/:id" element={<PropertyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/owner-dashboard" element={<OwnerDashboard />} /> {/* Add the new route */}
              
              {/* Admin routes with AuthCheck */}
              <Route path="/admin" element={
                <AuthCheck requiredRole="admin">
                  <AdminDashboard />
                </AuthCheck>
              } />
              <Route path="/admin/properties" element={
                <AuthCheck requiredRole="admin">
                  <AdminProperties />
                </AuthCheck>
              } />
              <Route path="/admin/bookings" element={
                <AuthCheck requiredRole="admin">
                  <AdminBookings />
                </AuthCheck>
              } />
              <Route path="/admin/users" element={
                <AuthCheck requiredRole="admin">
                  <AdminUsers />
                </AuthCheck>
              } />
              <Route path="/admin/settings" element={
                <AuthCheck requiredRole="admin">
                  <AdminSettings />
                </AuthCheck>
              } />
              <Route path="/admin/system" element={
                <AuthCheck requiredRole="admin">
                  <AdminSystem />
                </AuthCheck>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PropertiesProvider>
    </BookingsProvider>
  </QueryClientProvider>
);

export default App;
