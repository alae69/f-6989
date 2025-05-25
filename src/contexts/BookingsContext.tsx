
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  propertyId: string;
  propertyName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  phone?: string;
  comments?: string;
  createdAt: string;
}

interface BookingsContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  getBookingById: (id: string) => Booking | undefined;
  loading: boolean;
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};

export const BookingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Load bookings from localStorage on initial render
  useEffect(() => {
    const savedBookings = localStorage.getItem('martilhaven_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    setLoading(false);
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('martilhaven_bookings', JSON.stringify(bookings));
    }
  }, [bookings, loading]);

  const addBooking = (newBooking: Omit<Booking, 'id' | 'status' | 'createdAt'>) => {
    const booking: Booking = {
      ...newBooking,
      id: `BK${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    setBookings(prevBookings => [...prevBookings, booking]);
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingsContext.Provider value={{ 
      bookings, 
      addBooking, 
      updateBookingStatus, 
      getBookingById,
      loading 
    }}>
      {children}
    </BookingsContext.Provider>
  );
};
