
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ForkliftsPage from "./pages/Forklifts";
import ReportsPage from "./pages/Reports";
import OperatorsPage from "./pages/Operators";
import OperationsPage from "./pages/Operations";
import MaintenancePage from "./pages/Maintenance";
import GasSupplyPage from "./pages/GasSupply";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/forklifts" element={<ForkliftsPage />} />
            <Route path="/operators" element={<OperatorsPage />} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/gas-supply" element={<GasSupplyPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
