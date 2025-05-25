
import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useProperties } from '@/contexts/PropertiesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminProperties = () => {
  const { properties, updateProperty } = useProperties();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter properties based on search term
  const filteredProperties = properties.filter(property => 
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group properties by status
  const pendingProperties = filteredProperties.filter(p => p.status === 'pending');
  const approvedProperties = filteredProperties.filter(p => p.status === 'approved');
  const rejectedProperties = filteredProperties.filter(p => p.status === 'rejected');
  
  const handleApproveProperty = (id: string) => {
    updateProperty(id, { status: 'approved' });
    toast({
      title: "Property approved",
      description: "The property listing has been published.",
    });
  };
  
  const handleRejectProperty = (id: string) => {
    updateProperty(id, { status: 'rejected' });
    toast({
      title: "Property rejected",
      description: "The property listing has been rejected.",
    });
  };

  return (
    <AdminLayout title="Property Management">
      <div className="space-y-6">
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="w-full sm:max-w-sm">
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="featured" />
            <label htmlFor="featured" className="text-sm font-medium">
              Featured only
            </label>
          </div>
        </div>
        
        {/* Properties organized by tabs */}
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              Pending Review
              {pendingProperties.length > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                  {pendingProperties.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All Properties</TabsTrigger>
          </TabsList>
          
          {/* Pending properties tab */}
          <TabsContent value="pending">
            <h2 className="text-lg font-medium mb-4">Properties Pending Review</h2>
            {pendingProperties.length > 0 ? (
              <div className="space-y-4">
                {pendingProperties.map(property => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {property.images && property.images.length > 0 && (
                        <div className="w-full md:w-48 h-40">
                          <img 
                            src={property.images[0]} 
                            alt={property.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="flex-1 p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{property.title}</h3>
                            <p className="text-gray-500 text-sm">{property.location}</p>
                          </div>
                          <div className="text-sm text-gray-500 mt-2 md:mt-0">
                            ID: {property.id}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm line-clamp-2">{property.description}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4 text-xs">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bedrooms} bedrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bathrooms} bathrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">${property.price}/{property.priceUnit}</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="text-xs text-gray-500">
                            Submitted: {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'Unknown'}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              asChild
                            >
                              <Link to={`/property/${property.id}`}>
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleApproveProperty(property.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleRejectProperty(property.id)}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg border">
                <p className="text-gray-500">No pending properties to review</p>
              </div>
            )}
          </TabsContent>
          
          {/* Approved properties tab */}
          <TabsContent value="approved">
            <h2 className="text-lg font-medium mb-4">Approved Properties</h2>
            {approvedProperties.length > 0 ? (
              <div className="space-y-4">
                {approvedProperties.map(property => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {property.images && property.images.length > 0 && (
                        <div className="w-full md:w-48 h-40">
                          <img 
                            src={property.images[0]} 
                            alt={property.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="flex-1 p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{property.title}</h3>
                            <p className="text-gray-500 text-sm">{property.location}</p>
                          </div>
                          <div className="text-sm text-gray-500 mt-2 md:mt-0">
                            ID: {property.id}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4 text-xs">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bedrooms} bedrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bathrooms} bathrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">${property.price}/{property.priceUnit}</span>
                          {property.featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Featured</span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="text-xs text-gray-500">
                            Approved: {property.updatedAt ? new Date(property.updatedAt).toLocaleDateString() : 'Unknown'}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              asChild
                            >
                              <Link to={`/property/${property.id}`}>
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleRejectProperty(property.id)}
                            >
                              <X className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg border">
                <p className="text-gray-500">No approved properties</p>
              </div>
            )}
          </TabsContent>
          
          {/* Rejected properties tab */}
          <TabsContent value="rejected">
            <h2 className="text-lg font-medium mb-4">Rejected Properties</h2>
            {rejectedProperties.length > 0 ? (
              <div className="space-y-4">
                {rejectedProperties.map(property => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {property.images && property.images.length > 0 && (
                        <div className="w-full md:w-48 h-40">
                          <img 
                            src={property.images[0]} 
                            alt={property.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="flex-1 p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{property.title}</h3>
                            <p className="text-gray-500 text-sm">{property.location}</p>
                          </div>
                          <div className="text-sm text-gray-500 mt-2 md:mt-0">
                            ID: {property.id}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <p className="text-sm line-clamp-2">{property.description}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4 text-xs">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bedrooms} bedrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bathrooms} bathrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">${property.price}/{property.priceUnit}</span>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="text-xs text-gray-500">
                            Rejected: {property.updatedAt ? new Date(property.updatedAt).toLocaleDateString() : 'Unknown'}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              asChild
                            >
                              <Link to={`/property/${property.id}`}>
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleApproveProperty(property.id)}
                            >
                              <Check className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg border">
                <p className="text-gray-500">No rejected properties</p>
              </div>
            )}
          </TabsContent>
          
          {/* All properties tab */}
          <TabsContent value="all">
            <h2 className="text-lg font-medium mb-4">All Properties ({filteredProperties.length})</h2>
            {filteredProperties.length > 0 ? (
              <div className="space-y-4">
                {filteredProperties.map(property => (
                  <Card key={property.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {property.images && property.images.length > 0 && (
                        <div className="w-full md:w-48 h-40">
                          <img 
                            src={property.images[0]} 
                            alt={property.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardContent className="flex-1 p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-lg">{property.title}</h3>
                            <p className="text-gray-500 text-sm">{property.location}</p>
                            <div className={`mt-1 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                              property.status === 'approved' ? 'bg-green-100 text-green-800' : 
                              property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {property.status}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500 mt-2 md:mt-0">
                            ID: {property.id}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4 text-xs">
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bedrooms} bedrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">{property.bathrooms} bathrooms</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full">${property.price}/{property.priceUnit}</span>
                          {property.featured && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Featured</span>
                          )}
                        </div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="text-xs text-gray-500">
                            {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'Unknown'}
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              asChild
                            >
                              <Link to={`/property/${property.id}`}>
                                <Eye className="mr-1 h-4 w-4" />
                                View
                              </Link>
                            </Button>
                            {property.status !== 'approved' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-green-600 border-green-600 hover:bg-green-50"
                                onClick={() => handleApproveProperty(property.id)}
                              >
                                <Check className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                            )}
                            {property.status !== 'rejected' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => handleRejectProperty(property.id)}
                              >
                                <X className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg border">
                <p className="text-gray-500">No properties found</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;
