
import React from 'react';
import StatusCard from './StatusCard';
import { 
  Truck, Users, AlertTriangle, CheckCircle, 
  Clock, Fuel, Settings, Calendar, RefreshCw
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';

const DashboardOverview: React.FC = () => {
  const { stats, refreshStats, isLoading } = useAppContext();

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="slide-enter" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-semibold">Status da Frota</h2>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshStats}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Atualizar
        </Button>
      </div>
      
      <div className="slide-enter" style={{ animationDelay: '0.1s' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard 
            title="Total de Empilhadeiras" 
            value={stats.totalForklifts} 
            icon={Truck} 
            status="info" 
          />
          <StatusCard 
            title="Em Operação" 
            value={stats.operationalForklifts} 
            icon={CheckCircle} 
            status="success"
            change={{ value: 12, trend: 'up' }}
          />
          <StatusCard 
            title="Em Manutenção" 
            value={stats.maintenanceForklifts} 
            icon={Settings} 
            status="warning" 
          />
          <StatusCard 
            title="Paradas" 
            value={stats.stoppedForklifts} 
            icon={Clock} 
            status="neutral" 
          />
        </div>
      </div>

      <div className="slide-enter" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-2xl font-semibold mb-4">Status dos Operadores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard 
            title="Total de Operadores" 
            value={stats.totalOperators} 
            icon={Users} 
            status="info" 
          />
          <StatusCard 
            title="ASO e NR Regulares" 
            value={stats.operatorsWithValidCertificates} 
            icon={CheckCircle} 
            status="success" 
          />
          <StatusCard 
            title="Próximo do Vencimento" 
            value={stats.operatorsWithWarningCertificates} 
            icon={AlertTriangle} 
            status="warning" 
          />
          <StatusCard 
            title="ASO/NR Vencidos" 
            value={stats.operatorsWithExpiredCertificates} 
            icon={AlertTriangle} 
            status="danger" 
          />
        </div>
      </div>

      <div className="slide-enter" style={{ animationDelay: '0.3s' }}>
        <h2 className="text-2xl font-semibold mb-4">Operação Atual</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatusCard 
            title="Operações Ativas" 
            value={stats.activeOperations} 
            icon={Truck} 
            status="success"
            change={{ value: 5, trend: 'up' }}
          />
          <StatusCard 
            title="Manutenções Pendentes" 
            value={stats.pendingMaintenances} 
            icon={Settings} 
            status="warning" 
          />
          <StatusCard 
            title="Abastecimentos Hoje" 
            value={3} 
            icon={Fuel} 
            status="info" 
          />
          <StatusCard 
            title="ASOs a Vencer (30d)" 
            value={4} 
            icon={Calendar} 
            status="warning" 
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
