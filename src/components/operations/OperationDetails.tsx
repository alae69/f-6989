
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Operation } from '@/types';
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Gauge, Info, Map, Settings, Truck, User, Wrench } from 'lucide-react';

interface OperationDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation: Operation | null;
  onEdit: () => void;
}

const OperationDetails = ({ open, onOpenChange, operation, onEdit }: OperationDetailsProps) => {
  if (!operation) return null;

  // Format date with error handling
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString('en-US', { 
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Format time with error handling
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid time';
      }
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Invalid time';
    }
  };

  // Calculate operation duration with error handling
  const calculateDuration = () => {
    try {
      if (!operation.endTime) {
        const startTime = new Date(operation.startTime);
        if (isNaN(startTime.getTime())) {
          return 'Duration unavailable';
        }
        const now = new Date();
        const diff = now.getTime() - startTime.getTime();
        if (diff < 0) {
          return 'Operation not yet started';
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m (ongoing)`;
      } else {
        const startTime = new Date(operation.startTime);
        const endTime = new Date(operation.endTime);
        if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
          return 'Duration unavailable';
        }
        const diff = endTime.getTime() - startTime.getTime();
        if (diff < 0) {
          return 'Inconsistent data';
        }
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      }
    } catch (error) {
      console.error('Error calculating duration:', error);
      return 'Calculation error';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">Operation #{operation.id}</span>
            <Badge variant={operation.status === 'active' ? 'default' : 'secondary'}>
              {operation.status === 'active' ? 'In Progress' : 'Completed'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Started on: {formatDate(operation.startTime)} at {formatTime(operation.startTime)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">General Information</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Operator</span>
                </div>
                <span className="text-sm font-medium">{operation.operatorName || 'N/A'}</span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Forklift</span>
                </div>
                <span className="text-sm font-medium">{operation.forkliftModel} ({operation.forkliftId})</span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Sector</span>
                </div>
                <span className="text-sm font-medium">{operation.sector || 'N/A'}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Period and Duration</span>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">Start</span>
                <span className="text-sm font-medium">{formatTime(operation.startTime)}</span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">End</span>
                <span className="text-sm font-medium">
                  {operation.endTime ? formatTime(operation.endTime) : 'In progress'}
                </span>
              </div>
              
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm">Duration</span>
                <span className="text-sm font-medium">{calculateDuration()}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Hour Meter</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 p-3 bg-muted/20 rounded-md">
            <div>
              <span className="text-sm text-muted-foreground">Initial</span>
              <div className="text-lg font-medium">{operation.initialHourMeter?.toLocaleString() || 'N/A'}</div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Current/Final</span>
              <div className="text-lg font-medium">
                {(operation.currentHourMeter || operation.initialHourMeter)?.toLocaleString() || 'N/A'}
              </div>
            </div>
          </div>
          
          {operation.gasConsumption && (
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Fuel Consumption</span>
              </div>
              
              <div className="p-3 bg-muted/20 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Total Consumption</span>
                  <span className="text-sm font-medium">{operation.gasConsumption} L</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={onEdit}>
            Edit Operation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OperationDetails;
