
import React, { useState, useEffect } from 'react';
import { User, Search, Filter, Edit, Trash2, Check, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import UserEditModal from '@/components/UserEditModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'staff' | 'customer';
  status: 'active' | 'inactive';
  registeredDate: string;
  lastLogin: string;
  password?: string;
}

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [users, setUsers] = useState<UserData[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [newPassword, setNewPassword] = useState('');

  // Load users from localStorage on initial render
  useEffect(() => {
    const savedUsers = localStorage.getItem('martilhaven_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      // Sample users data if none exist
      const defaultUsers = [
        {
          id: "1",
          name: "John Smith",
          email: "john.smith@example.com",
          phone: "+1 123-456-7890",
          role: "customer",
          status: "active",
          registeredDate: "2023-01-15",
          lastLogin: "2023-05-28"
        },
        {
          id: "2",
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          phone: "+1 234-567-8901",
          role: "customer",
          status: "active",
          registeredDate: "2023-02-05",
          lastLogin: "2023-05-27"
        },
        {
          id: "3",
          name: "Michael Brown",
          email: "mbrown@example.com",
          phone: "+1 345-678-9012",
          role: "customer",
          status: "inactive",
          registeredDate: "2023-02-18",
          lastLogin: "2023-04-10"
        },
        {
          id: "4",
          name: "Amina Benali",
          email: "amina@martilhaven.com",
          phone: "+212 5XX XX XX XX",
          role: "admin",
          status: "active",
          registeredDate: "2023-01-01",
          lastLogin: "2023-05-30"
        },
        {
          id: "5",
          name: "Youssef Alami",
          email: "youssef@martilhaven.com",
          phone: "+212 6XX XX XX XX",
          role: "staff",
          status: "active",
          registeredDate: "2023-01-05",
          lastLogin: "2023-05-29"
        },
        {
          id: "6",
          name: "Laura Wilson",
          email: "lwilson@example.com",
          phone: "+1 456-789-0123",
          role: "customer",
          status: "active",
          registeredDate: "2023-03-10",
          lastLogin: "2023-05-25"
        }
      ];
      setUsers(defaultUsers as UserData[]);
      localStorage.setItem('martilhaven_users', JSON.stringify(defaultUsers));
    }
  }, []);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('martilhaven_users', JSON.stringify(users));
  }, [users]);

  // Filter users by search term and role
  const filteredUsers = users.filter(user => {
    // Filter by search term
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by role
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  const getUserStatusBadgeClass = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getUserRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'staff':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleUpdateUserStatus = (id: string, newStatus: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: newStatus as 'active' | 'inactive' } : user
      )
    );
    
    toast({
      title: "User Status Updated",
      description: `User status has been updated to ${newStatus}.`,
    });
  };

  const handleUpdateUserRole = (id: string, newRole: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === id ? { ...user, role: newRole as 'admin' | 'staff' | 'customer' } : user
      )
    );
    
    toast({
      title: "User Role Updated",
      description: `User role has been updated to ${newRole}.`,
    });
  };

  const handleEditUser = (user: UserData) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: UserData) => {
    setSelectedUser(user);
    setIsConfirmDialogOpen(true);
  };

  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
      setIsConfirmDialogOpen(false);
      setSelectedUser(null);
      
      toast({
        title: "User Deleted",
        description: "The user has been successfully deleted.",
      });
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsAddModalOpen(true);
  };

  const handleChangePassword = (user: UserData) => {
    setSelectedUser(user);
    setNewPassword('');
    setIsPasswordDialogOpen(true);
  };

  const confirmChangePassword = () => {
    if (selectedUser && newPassword) {
      // In a real application, you would hash the password before storing it
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id ? { ...user, password: newPassword } : user
        )
      );
      
      setIsPasswordDialogOpen(false);
      setSelectedUser(null);
      setNewPassword('');
      
      toast({
        title: "Password Changed",
        description: "The user's password has been successfully changed.",
      });
    }
  };

  const handleSaveUser = (userData: UserData) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUser.id ? { ...userData, id: user.id } : user
        )
      );
      
      toast({
        title: "User Updated",
        description: "The user information has been successfully updated.",
      });
    } else {
      // Add new user
      const newUser: UserData = {
        ...userData,
        id: `USER${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        registeredDate: new Date().toISOString().split('T')[0],
        lastLogin: '-',
      };
      
      setUsers(prevUsers => [...prevUsers, newUser]);
      
      toast({
        title: "User Added",
        description: "New user has been successfully added.",
      });
    }
    
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
  };

  return (
    <AdminLayout title="Users">
      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-moroccan-blue focus:border-moroccan-blue w-full md:w-80"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-500">Role:</span>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          
          <Button 
            onClick={handleAddUser}
            className="bg-moroccan-blue text-white hover:bg-moroccan-blue/90"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add User
          </Button>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getUserRoleBadgeClass(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getUserStatusBadgeClass(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-900">Registered: {user.registeredDate}</div>
                    <div className="text-sm text-gray-500">Last login: {user.lastLogin}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit User"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleChangePassword(user)}
                        className="text-amber-600 hover:text-amber-800"
                        title="Change Password"
                      >
                        <User size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Empty state */}
        {filteredUsers.length === 0 && (
          <div className="py-12 text-center">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm 
                ? `No users match "${searchTerm}"` 
                : filterRole !== 'all' 
                  ? `No users with role "${filterRole}" found`
                  : 'No users have been added yet.'}
            </p>
            {!searchTerm && !filterRole && (
              <div className="mt-6">
                <Button
                  onClick={handleAddUser}
                  className="bg-moroccan-blue hover:bg-moroccan-blue/90"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add User
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete the user "{selectedUser?.name}"? This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Delete User
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change User Password</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">
              Enter a new password for {selectedUser?.name}
            </p>
            <div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-moroccan-blue focus:border-moroccan-blue"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-moroccan-blue hover:bg-moroccan-blue/90" 
              onClick={confirmChangePassword}
              disabled={!newPassword}
            >
              Change Password
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit or Add User Modal */}
      {(isEditModalOpen || isAddModalOpen) && (
        <UserEditModal
          user={selectedUser}
          isOpen={isEditModalOpen || isAddModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setIsAddModalOpen(false);
          }}
          onSave={handleSaveUser}
        />
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
