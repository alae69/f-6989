import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useBookings } from "@/contexts/BookingsContext";
import { useProperties } from "@/contexts/PropertiesContext";
import { 
  Building, 
  User, 
  Calendar, 
  ChartBarIcon,
  Settings,
  Database
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems = [
    { 
      name: 'Dashboard', 
      path: '/admin', 
      icon: ChartBarIcon 
    },
    { 
      name: 'Properties', 
      path: '/admin/properties', 
      icon: Building 
    },
    { 
      name: 'Bookings', 
      path: '/admin/bookings', 
      icon: Calendar 
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: User 
    },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') {
      return currentPath === '/admin';
    }
    return currentPath.startsWith(path);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-moroccan-blue text-white p-2 rounded">
              <span className="font-serif text-sm">M</span>
            </div>
            <div className="font-serif text-lg text-moroccan-blue">
              <span>Martil</span>
              <span className="text-moroccan-gold">Haven</span>
            </div>
          </Link>
        </div>
        <div className="py-4">
          <div className="px-4 mb-4">
            <p className="text-xs uppercase font-medium text-gray-500">Main</p>
          </div>
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 ${
                  isActive(item.path)
                    ? 'bg-moroccan-blue/10 text-moroccan-blue border-r-4 border-moroccan-blue'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon size={18} className="mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="px-4 mt-8 mb-4">
            <p className="text-xs uppercase font-medium text-gray-500">Settings</p>
          </div>
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              <Settings size={18} className="mr-3" />
              <span>General Settings</span>
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
            >
              <Database size={18} className="mr-3" />
              <span>System</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-medium text-gray-800">{title}</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                <span className="font-medium text-sm">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { bookings } = useBookings();
  const { properties } = useProperties();
  
  // Calculate real stats from bookings and properties
  const totalProperties = properties.length;
  const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.amount, 0);
  
  // Sample data for users (not implemented in the current system)
  const totalUsers = 342; // This would be replaced with real data when user management is implemented
  
  const stats = [
    { 
      title: 'Total Properties', 
      value: String(totalProperties), 
      change: `${totalProperties > 0 ? '+' : ''}${totalProperties} total`, 
      icon: Building, 
      color: 'blue' 
    },
    { 
      title: 'Active Bookings', 
      value: String(activeBookings), 
      change: `${activeBookings > 0 ? '+' : ''}${activeBookings} total`, 
      icon: Calendar, 
      color: 'green' 
    },
    { 
      title: 'Total Users', 
      value: String(totalUsers), 
      change: '+12 this month', 
      icon: User, 
      color: 'yellow' 
    },
    { 
      title: 'Revenue', 
      value: `$${totalRevenue.toFixed(2)}`, 
      change: totalRevenue > 0 ? `+$${totalRevenue.toFixed(2)} total` : 'No revenue yet', 
      icon: ChartBarIcon, 
      color: 'red' 
    },
  ];

  // Get real recent bookings (last 3)
  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    .map(booking => ({
      id: booking.id, 
      property: booking.propertyName, 
      guest: booking.guestName, 
      checkIn: booking.checkIn, 
      checkOut: booking.checkOut,
      status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
      amount: `$${booking.amount}`
    }));

  // If we don't have recent bookings, use sample data
  if (recentBookings.length === 0) {
    recentBookings.push(
      { 
        id: 'No bookings', 
        property: 'No properties booked yet', 
        guest: 'N/A', 
        checkIn: '-', 
        checkOut: '-',
        status: 'N/A',
        amount: '$0'
      }
    );
  }

  // Calculate popular properties based on bookings
  const getPropertyBookingsCount = (propertyId: string) => {
    return bookings.filter(booking => booking.propertyId === propertyId).length;
  };
  
  // Sort properties by number of bookings
  const popularProperties = [...properties]
    .map(property => ({
      name: property.title, 
      location: property.location, 
      bookings: getPropertyBookingsCount(property.id), 
      views: Math.floor(property.rating * 50), // Simulating views based on rating
      rating: property.rating
    }))
    .sort((a, b) => b.bookings - a.bookings || b.rating - a.rating) // Sort by bookings, then by rating
    .slice(0, 3); // Take top 3

  // If there are no properties, use placeholder data
  if (popularProperties.length === 0) {
    popularProperties.push(
      { 
        name: 'No properties available', 
        location: 'N/A', 
        bookings: 0, 
        views: 0,
        rating: 0
      }
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  const formatDate = (dateStr: string) => {
    if (dateStr === '-') return '-';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const StatIcon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                  <StatIcon className={`text-${stat.color}-600`} size={24} />
                </div>
                <span className="text-sm text-gray-500">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-medium mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Booking Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Booking Statistics</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            {/* In a real application, this would be a chart */}
            <div className="text-gray-500">Booking Chart Visualization</div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Revenue Statistics</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            {/* In a real application, this would be a chart */}
            <div className="text-gray-500">Revenue Chart Visualization</div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Recent Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In/Out
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="max-w-[200px] truncate">{booking.property}</div>
                      <div className="text-xs text-gray-400">{booking.guest}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formatDate(booking.checkIn)}</div>
                      <div>{formatDate(booking.checkOut)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <Link to="/admin/bookings" className="text-sm font-medium text-moroccan-blue hover:underline">
              View all bookings
            </Link>
          </div>
        </div>

        {/* Popular Properties */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium">Popular Properties</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bookings
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {popularProperties.map((property, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="max-w-[200px] truncate">{property.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{property.bookings} bookings</div>
                      <div className="text-xs text-gray-400">{property.views} views</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="text-gray-900">{property.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-gray-200 px-6 py-4">
            <Link to="/admin/properties" className="text-sm font-medium text-moroccan-blue hover:underline">
              View all properties
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
