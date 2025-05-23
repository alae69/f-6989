
import { useState, useCallback } from 'react';
import { Operation } from '@/types';

// Mock initial data
const initialOperations: Operation[] = [
  {
    id: 'OP001',
    operatorId: 'U001',
    operatorName: 'João Silva',
    forkliftId: 'G001',
    forkliftModel: 'Toyota 8FGU25',
    sector: 'Armazém A',
    initialHourMeter: 12583,
    currentHourMeter: 12585,
    gasConsumption: 2.5,
    startTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    status: 'active'
  },
  {
    id: 'OP002',
    operatorId: 'U002',
    operatorName: 'Maria Santos',
    forkliftId: 'E002',
    forkliftModel: 'Hyster E50XN',
    sector: 'Expedição',
    initialHourMeter: 8452,
    currentHourMeter: 8454,
    startTime: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    endTime: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    status: 'completed'
  }
];

export const useOperationsStore = () => {
  const [operations, setOperations] = useState<Operation[]>(initialOperations);

  const addOperation = useCallback((operation: Omit<Operation, 'id'>) => {
    const newOperation: Operation = {
      ...operation,
      id: `OP${String(operations.length + 1).padStart(3, '0')}`
    };
    setOperations(prev => [...prev, newOperation]);
    return newOperation;
  }, [operations.length]);

  const updateOperation = useCallback((id: string, updates: Partial<Operation>) => {
    setOperations(prev => 
      prev.map(op => op.id === id ? { ...op, ...updates } : op)
    );
  }, []);

  const deleteOperation = useCallback((id: string) => {
    setOperations(prev => prev.filter(op => op.id !== id));
  }, []);

  const getActiveOperations = useCallback(() => {
    return operations.filter(op => op.status === 'active');
  }, [operations]);

  const getCompletedOperations = useCallback(() => {
    return operations.filter(op => op.status === 'completed');
  }, [operations]);

  return {
    operations,
    addOperation,
    updateOperation,
    deleteOperation,
    getActiveOperations,
    getCompletedOperations
  };
};
