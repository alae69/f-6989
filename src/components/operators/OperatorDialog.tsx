
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CertificateStatus, User, UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon } from 'lucide-react';

interface OperatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operator?: User;
  onSave: (operator: User) => void;
}

const OperatorDialog = ({ open, onOpenChange, operator, onSave }: OperatorDialogProps) => {
  const { toast } = useToast();
  const isEditing = !!operator;
  
  const [formData, setFormData] = React.useState<Partial<User>>(
    operator || {
      id: `OP${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      name: '',
      role: UserRole.OPERATOR,
      cpf: '',
      contact: '',
      shift: 'Morning',
      registrationDate: format(new Date(), 'MM/dd/yyyy'),
      asoExpirationDate: format(new Date(new Date().setMonth(new Date().getMonth() + 12)), 'MM/dd/yyyy'),
      nrExpirationDate: format(new Date(new Date().setMonth(new Date().getMonth() + 12)), 'MM/dd/yyyy'),
      asoStatus: CertificateStatus.REGULAR,
      nrStatus: CertificateStatus.REGULAR
    }
  );

  // Convert date string to Date object for Calendar
  const parseDate = (dateStr: string): Date => {
    const [month, day, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day);
  };

  // Handle form field changes
  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle date changes
  const handleDateChange = (field: 'asoExpirationDate' | 'nrExpirationDate', date: Date | undefined) => {
    if (!date) return;
    
    const formattedDate = format(date, 'MM/dd/yyyy');
    setFormData(prev => ({ ...prev, [field]: formattedDate }));
    
    // Update certificate status based on date
    const today = new Date();
    const expirationDate = date;
    const diffTime = expirationDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    
    let status: CertificateStatus;
    if (diffDays < 0) {
      status = CertificateStatus.EXPIRED;
    } else if (diffDays < 30) {
      status = CertificateStatus.WARNING;
    } else {
      status = CertificateStatus.REGULAR;
    }
    
    const statusField = field === 'asoExpirationDate' ? 'asoStatus' : 'nrStatus';
    setFormData(prev => ({ ...prev, [statusField]: status }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.cpf || !formData.contact) {
      toast({
        title: "Error saving",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Save operator
    onSave(formData as User);
    
    // Reset form and close dialog
    if (!isEditing) {
      setFormData({
        id: `OP${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        name: '',
        role: UserRole.OPERATOR,
        cpf: '',
        contact: '',
        shift: 'Morning',
        registrationDate: format(new Date(), 'MM/dd/yyyy'),
        asoExpirationDate: format(new Date(new Date().setMonth(new Date().getMonth() + 12)), 'MM/dd/yyyy'),
        nrExpirationDate: format(new Date(new Date().setMonth(new Date().getMonth() + 12)), 'MM/dd/yyyy'),
        asoStatus: CertificateStatus.REGULAR,
        nrStatus: CertificateStatus.REGULAR
      });
    }
    
    onOpenChange(false);
    
    toast({
      title: isEditing ? "Operator updated" : "Operator added",
      description: `${formData.name} has been ${isEditing ? 'updated' : 'added'} successfully!`
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Operator' : 'Add New Operator'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Edit the operator information in the fields below.' 
              : 'Fill in the new operator information in the fields below.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Operator name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleChange('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.OPERATOR}>Operator</SelectItem>
                  <SelectItem value={UserRole.SUPERVISOR}>Supervisor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input 
                id="cpf" 
                value={formData.cpf} 
                onChange={(e) => handleChange('cpf', e.target.value)}
                placeholder="000.000.000-00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input 
                id="contact" 
                value={formData.contact} 
                onChange={(e) => handleChange('contact', e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shift">Shift</Label>
              <Select 
                value={formData.shift} 
                onValueChange={(value) => handleChange('shift', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Afternoon">Afternoon</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                  <SelectItem value="Full">Full</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>ASO Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.asoExpirationDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={parseDate(formData.asoExpirationDate || '')}
                  onSelect={(date) => handleDateChange('asoExpirationDate', date)}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>NR-11 Expiration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.nrExpirationDate}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={parseDate(formData.nrExpirationDate || '')}
                  onSelect={(date) => handleDateChange('nrExpirationDate', date)}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Add Operator'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperatorDialog;
