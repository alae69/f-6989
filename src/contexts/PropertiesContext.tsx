
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '@/data/properties';

interface PropertiesContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  loading: boolean;
}

// Export the context so it can be imported directly
export const PropertiesContext = createContext<PropertiesContextType>({
  properties: [],
  addProperty: () => {},
  updateProperty: () => {},
  deleteProperty: () => {},
  loading: false
});

export const useProperties = () => {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // Load properties from localStorage on initial render
  useEffect(() => {
    const savedProperties = localStorage.getItem('martilhaven_properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    } else {
      // Import default properties if none exist
      import('@/data/properties').then((module) => {
        // Add status field to existing properties if not present
        const updatedProperties = module.properties.map(property => ({
          ...property,
          status: property.status || 'approved' as 'approved',
          ownerId: property.ownerId || 'admin', // Default owner for existing properties
          createdAt: property.createdAt || new Date().toISOString(),
        }));
        setProperties(updatedProperties);
        localStorage.setItem('martilhaven_properties', JSON.stringify(updatedProperties));
      });
    }
    setLoading(false);
  }, []);

  // Save properties to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('martilhaven_properties', JSON.stringify(properties));
    }
  }, [properties, loading]);

  const addProperty = (newProperty: Omit<Property, 'id'>) => {
    const property: Property = {
      ...newProperty,
      id: `PROP${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      status: newProperty.status || 'pending' as 'pending', // Default status for new properties
    };
    
    setProperties(prevProperties => [...prevProperties, property]);
  };

  const updateProperty = (id: string, updatedFields: Partial<Property>) => {
    setProperties(prevProperties => 
      prevProperties.map(property => 
        property.id === id ? { ...property, ...updatedFields } : property
      )
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prevProperties => 
      prevProperties.filter(property => property.id !== id)
    );
  };

  return (
    <PropertiesContext.Provider value={{ 
      properties, 
      addProperty, 
      updateProperty, 
      deleteProperty,
      loading 
    }}>
      {children}
    </PropertiesContext.Provider>
  );
};
