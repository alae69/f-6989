
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1900&q=80" 
              alt="Martil Cityscape" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Moroccan Pattern Overlay */}
            <div className="absolute inset-0 moroccan-pattern"></div>
          </div>
          
          <div className="container-custom relative z-10 text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">About MartilHaven</h1>
            <p className="text-xl max-w-2xl opacity-90">
              Connecting travelers with exceptional vacation properties in beautiful Martil, Morocco.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="section-title mb-6">Our Story</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                MartilHaven began with a simple vision: to showcase the beauty and charm of Martil, Morocco to travelers from around the world. Founded in 2020 by a group of Martil natives and travel enthusiasts, our mission is to provide visitors with authentic, high-quality accommodation experiences that highlight the unique character of this Mediterranean gem.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Each property in our collection is personally vetted by our team to ensure it meets our standards of quality, comfort, and authentic Moroccan hospitality. From luxurious beachfront villas to traditional riads in the heart of the medina, our diverse portfolio offers something for every type of traveler.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that the right accommodation can transform a good vacation into an unforgettable one. That's why we work closely with property owners to maintain high standards and with guests to understand their needs and preferences. Our local knowledge and personalized service set us apart, helping travelers discover not just beautiful properties but the true essence of Martil.
              </p>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us */}
        <section className="py-16 bg-moroccan-white">
          <div className="container-custom">
            <h2 className="section-title text-center mx-auto">Why Choose MartilHaven</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-moroccan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-moroccan-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-4">Curated Selection</h3>
                <p className="text-gray-600">
                  Every property is personally inspected and selected for its quality, location, and distinctive character.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-moroccan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-moroccan-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-4">Local Expertise</h3>
                <p className="text-gray-600">
                  Our team of Martil natives provides insider knowledge and recommendations to enhance your stay.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <div className="bg-moroccan-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-moroccan-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-medium mb-4">Personalized Service</h3>
                <p className="text-gray-600">
                  From booking assistance to arranging special experiences, we're dedicated to making your stay perfect.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Meet the Team */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="section-title text-center mx-auto">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-200">
                  {/* In a real application, this would be a team member photo */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-gray-500">Team Member Photo</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium mb-1">Amina Benali</h3>
                  <p className="text-moroccan-gold mb-4">Founder & CEO</p>
                  <p className="text-gray-600">
                    Born and raised in Martil, Amina combines her deep love for her hometown with years of experience in the hospitality industry.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-200">
                  {/* In a real application, this would be a team member photo */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-gray-500">Team Member Photo</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium mb-1">Youssef Alami</h3>
                  <p className="text-moroccan-gold mb-4">Property Manager</p>
                  <p className="text-gray-600">
                    With over 15 years in property management, Youssef ensures that all our properties meet the highest standards of quality and comfort.
                  </p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-64 bg-gray-200">
                  {/* In a real application, this would be a team member photo */}
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <div className="text-gray-500">Team Member Photo</div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium mb-1">Sofia Martinez</h3>
                  <p className="text-moroccan-gold mb-4">Guest Experience Manager</p>
                  <p className="text-gray-600">
                    Sofia's passion for hospitality and cultural exchange helps create memorable experiences for all our guests.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-moroccan-blue text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Authenticity</h3>
                <p className="opacity-80">
                  We showcase the true culture and beauty of Martil through our properties and experiences.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Excellence</h3>
                <p className="opacity-80">
                  We strive for the highest standards in every aspect of our service and property selection.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Community</h3>
                <p className="opacity-80">
                  We support local businesses and artisans, fostering sustainable tourism that benefits Martil.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Integrity</h3>
                <p className="opacity-80">
                  We operate with transparency, honesty, and fairness in all our dealings with guests and partners.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
