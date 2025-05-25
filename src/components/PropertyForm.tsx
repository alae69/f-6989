
import React, { useState } from 'react';
import { Property } from '@/data/properties';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the schema for property form validation
const propertySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  priceUnit: z.string(),
  location: z.string().min(3, 'Location is required'),
  bedrooms: z.coerce.number().int().positive('Bedrooms must be at least 1'),
  bathrooms: z.coerce.number().int().positive('Bathrooms must be at least 1'),
  capacity: z.coerce.number().int().positive('Capacity must be at least 1'),
  featured: z.boolean().default(false),
});

type PropertyFormValues = z.infer<typeof propertySchema> & {
  amenities: string[];
  images: string[];
};

interface PropertyFormProps {
  property?: Property;
  onSubmit: (data: PropertyFormValues) => void;
  onCancel: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ property, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const defaultAmenities = [
    'Private Pool', 'Ocean View', 'Air Conditioning', 'Free WiFi', 
    'Full Kitchen', 'Terrace', 'Garden', 'BBQ Area', 'Parking',
    'Courtyard', 'Rooftop Terrace', 'Traditional Hammam'
  ];
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    property?.amenities || []
  );
  
  const [images, setImages] = useState<string[]>(
    property?.images || ['', '', '']
  );

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || '',
      description: property?.description || '',
      price: property?.price || 0,
      priceUnit: property?.priceUnit || 'night',
      location: property?.location || '',
      bedrooms: property?.bedrooms || 1,
      bathrooms: property?.bathrooms || 1,
      capacity: property?.capacity || 1,
      featured: property?.featured || false,
      amenities: property?.amenities || [],
      images: property?.images || [],
    },
  });

  const handleAmenityChange = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleImageUpload = (index: number) => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    
    fileInput.addEventListener('change', (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        const reader = new FileReader();
        
        reader.onload = (loadEvent) => {
          const result = loadEvent.target?.result as string;
          setImages(prev => {
            const newImages = [...prev];
            newImages[index] = result;
            return newImages;
          });
          toast({
            title: "Image uploaded",
            description: "Your image has been successfully uploaded.",
          });
        };
        
        reader.readAsDataURL(file);
      }
    });
    
    // Trigger file input click
    fileInput.click();
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      newImages[index] = '';
      return newImages;
    });
  };

  const handleFormSubmit = (data: z.infer<typeof propertySchema>) => {
    // Add the selected amenities and images to the form data
    const formData: PropertyFormValues = {
      ...data,
      amenities: selectedAmenities,
      images: images.filter(img => img !== ''),
    };
    
    // If no images were uploaded, show an error
    if (formData.images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6 border-b">
        <h2 className="text-lg font-medium">{property ? 'Edit Property' : 'Add New Property'}</h2>
      </div>
      
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Basic property details */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm rounded-l-lg">
                          $
                        </span>
                        <Input 
                          type="number" 
                          className="rounded-l-none"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="priceUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Unit</FormLabel>
                    <FormControl>
                      <select
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                        {...field}
                      >
                        <option value="night">Per Night</option>
                        <option value="week">Per Week</option>
                        <option value="month">Per Month</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Guests</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="standard"
                            checked={!field.value}
                            onChange={() => form.setValue('featured', false)}
                            className="h-4 w-4 text-moroccan-blue focus:ring-moroccan-blue border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Standard</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="featured"
                            checked={field.value}
                            onChange={() => form.setValue('featured', true)}
                            className="h-4 w-4 text-moroccan-blue focus:ring-moroccan-blue border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">Featured</span>
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-moroccan-blue focus:border-moroccan-blue"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amenities */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {defaultAmenities.map(amenity => (
                  <label key={amenity} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-moroccan-blue focus:ring-moroccan-blue border-gray-300 rounded"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Images - Real image upload functionality */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Images
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
                    {image ? (
                      <div className="relative w-full h-32">
                        <img
                          src={image}
                          alt={`Property image ${index + 1}`}
                          className="h-full w-full object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Trash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleImageUpload(index)}
                        className="flex flex-col items-center justify-center w-full h-32 focus:outline-none"
                      >
                        <Plus className="h-10 w-10 text-gray-300" />
                        <p className="mt-2 text-xs text-gray-500">Upload Image</p>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-moroccan-blue hover:bg-moroccan-blue/90"
              >
                {property ? 'Update Property' : 'Add Property'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PropertyForm;
