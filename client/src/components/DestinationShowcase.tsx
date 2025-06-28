const DestinationShowcase: React.FC = () => {
  const destinations = [
    {
      name: 'Cabo Negro',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', // Change this to Marina Smir image
      description: 'Pristine beaches and luxury coastal resorts with breathtaking Atlantic views',
      properties: 18,
      avgRating: 4.8
    },
    {
      name: 'Tetouan',
      image: 'https://images.yourbestimageurl.com/tetouan.jpg', // Replace with the best picture URL for Tetouan
      description: 'Rich Andalusian heritage and traditional Moroccan architecture in the heart of the Rif',
      properties: 25,
      avgRating: 4.7
    },
    {
      name: 'Marina Smir',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Luxury marina resort with stunning Mediterranean views and world-class amenities',
      properties: 22,
      avgRating: 4.9
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-moroccan-white to-gray-50">
      <div className="container-custom">
        <h2 className="section-title text-center mx-auto">Explore Morocco's Wonders</h2>
        {/* The rest of your component remains the same */}
      </div>
    </section>
  );
};

export default DestinationShowcase;