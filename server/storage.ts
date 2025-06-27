
import { supabase } from "./db";
import type { User, Property, Booking } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: any): Promise<User>;
  updateUser(id: number, user: any): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
  
  // Property methods
  getProperty(id: number): Promise<Property | undefined>;
  getAllProperties(): Promise<Property[]>;
  getPropertiesByOwner(ownerId: number): Promise<Property[]>;
  createProperty(property: any): Promise<Property>;
  updateProperty(id: number, property: any): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // Booking methods
  getBooking(id: number): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  getBookingsByProperty(propertyId: number): Promise<Booking[]>;
  createBooking(booking: any): Promise<Booking>;
  updateBooking(id: number, booking: any): Promise<Booking | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching user:', error);
      return undefined;
    }
    return data;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error) return undefined;
    return data;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) return undefined;
    return data;
  }

  async createUser(insertUser: any): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({
        ...insertUser,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateUser(id: number, userUpdate: any): Promise<User | undefined> {
    const { data, error } = await supabase
      .from('users')
      .update({
        ...userUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) return undefined;
    return data;
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      return !error;
    } catch (error) {
      console.error("Delete user error:", error);
      return false;
    }
  }

  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }
    return data || [];
  }

  // Property methods
  async getProperty(id: number): Promise<Property | undefined> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data;
  }

  async getAllProperties(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
    return data || [];
  }

  async getPropertiesByOwner(ownerId: number): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('owner_id', ownerId);
    
    if (error) {
      console.error('Error fetching properties by owner:', error);
      return [];
    }
    return data || [];
  }

  async createProperty(insertProperty: any): Promise<Property> {
    const { data, error } = await supabase
      .from('properties')
      .insert({
        ...insertProperty,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateProperty(id: number, propertyUpdate: any): Promise<Property | undefined> {
    const { data, error } = await supabase
      .from('properties')
      .update({
        ...propertyUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) return undefined;
    return data;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);
    
    return !error;
  }

  // Booking methods
  async getBooking(id: number): Promise<Booking | undefined> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data;
  }

  async getAllBookings(): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
    return data || [];
  }

  async getBookingsByProperty(propertyId: number): Promise<Booking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('property_id', propertyId);
    
    if (error) {
      console.error('Error fetching bookings by property:', error);
      return [];
    }
    return data || [];
  }

  async createBooking(insertBooking: any): Promise<Booking> {
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        ...insertBooking,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateBooking(id: number, bookingUpdate: any): Promise<Booking | undefined> {
    const { data, error } = await supabase
      .from('bookings')
      .update({
        ...bookingUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) return undefined;
    return data;
  }
}

export const storage = new DatabaseStorage();
