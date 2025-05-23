
import React, { createContext, useContext, useEffect, useState } from 'react';
import { DashboardStats } from '@/types';
import { useOperationsStore } from '@/hooks/useOperationsStore';

interface AppContextType {
  stats: DashboardStats;
  refreshStats: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { operations, getActiveOperations } = useOperationsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<DashboardStats>({
    totalForklifts: 15,
    operationalForklifts: 9,
    stoppedForklifts: 3,
    maintenanceForklifts: 3,
    totalOperators: 20,
    operatorsWithValidCertificates: 16,
    operatorsWithWarningCertificates: 3,
    operatorsWithExpiredCertificates: 1,
    activeOperations: 0,
    pendingMaintenances: 4
  });

  const refreshStats = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const activeOps = getActiveOperations();
      setStats(prev => ({
        ...prev,
        activeOperations: activeOps.length
      }));
      setIsLoading(false);
    }, 500);
  };

  // Update stats when operations change
  useEffect(() => {
    const activeOps = getActiveOperations();
    setStats(prev => ({
      ...prev,
      activeOperations: activeOps.length
    }));
  }, [operations, getActiveOperations]);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AppContext.Provider value={{ stats, refreshStats, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};
