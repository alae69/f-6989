
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import ForkliftCard from '@/components/forklift/ForkliftCard';
import { Forklift, ForkliftStatus, ForkliftType } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppContext } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

// Mock data for the dashboard with better error handling
const mockForklifts: Forklift[] = [
  {
    id: 'G001',
    model: 'Toyota 8FGU25',
    type: ForkliftType.GAS,
    capacity: '2,500 kg',
    acquisitionDate: '05/10/2022',
    lastMaintenance: '09/15/2023',
    status: ForkliftStatus.OPERATIONAL,
    hourMeter: 12583,
  },
  {
    id: 'E002',
    model: 'Hyster E50XN',
    type: ForkliftType.ELECTRIC,
    capacity: '2,250 kg',
    acquisitionDate: '11/22/2021',
    lastMaintenance: '10/30/2023',
    status: ForkliftStatus.OPERATIONAL,
    hourMeter: 8452,
  },
  {
    id: 'R003',
    model: 'Crown RR5725',
    type: ForkliftType.RETRACTABLE,
    capacity: '1,800 kg',
    acquisitionDate: '03/04/2022',
    lastMaintenance: '08/12/2023',
    status: ForkliftStatus.MAINTENANCE,
    hourMeter: 10974,
  },
  {
    id: 'G004',
    model: 'Yale GLP050',
    type: ForkliftType.GAS,
    capacity: '2,200 kg',
    acquisitionDate: '07/18/2022',
    lastMaintenance: '11/05/2023',
    status: ForkliftStatus.STOPPED,
    hourMeter: 6782,
  },
];

const Index = () => {
  const isMobile = useIsMobile();
  const { stats, isLoading } = useAppContext();
  const [currentDate, setCurrentDate] = useState<string>('');
  
  useEffect(() => {
    // Set current date in English format with error handling
    try {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      const formattedDate = now.toLocaleDateString('en-US', options);
      
      // First letter uppercase
      setCurrentDate(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    } catch (error) {
      console.error('Error formatting date:', error);
      setCurrentDate('Date not available');
    }
  }, []);

  const handleForkliftClick = (forklift: Forklift) => {
    console.log(`Clicked on forklift ${forklift.id}:`, forklift);
    // Here you could navigate to a detailed view or open a modal
  };

  if (isLoading && !stats) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64" // Offset for sidebar when not mobile
      )}>
        <Navbar 
          title="Dashboard" 
          subtitle={currentDate}
        />
        
        <main className="flex-1 px-6 py-6">
          <DashboardOverview />
          
          <section className="mt-8 slide-enter" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Featured Forklifts</h2>
              <button className="text-sm text-primary hover:underline transition-colors">
                View all
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockForklifts.map((forklift) => (
                <ForkliftCard 
                  key={forklift.id} 
                  forklift={forklift} 
                  onClick={() => handleForkliftClick(forklift)}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
