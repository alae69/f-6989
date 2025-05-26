import React from "react";

const BecomeAHost = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Start Hosting with MartilHaven</h1>
        <p className="text-lg md:text-2xl mb-6">Share your space, earn income, and connect with travelers worldwide.</p>
        <button className="bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
          Try Hosting
        </button>
      </section>

      {/* Why Host with Us Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Host with Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Earn Extra Income", icon: "💰" },
            { title: "Full Control of Your Property", icon: "🏠" },
            { title: "Meet Travelers from Around the World", icon: "🌍" },
            { title: "We’re With You Every Step", icon: "🤝" },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Host Story or Testimonial */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Host"
            className="w-24 h-24 rounded-full mx-auto mb-6"
          />
          <blockquote className="text-xl italic text-gray-700">
            "Hosting with MartilHaven has been an incredible experience. I've met amazing people and earned extra income
            effortlessly."
          </blockquote>
          <p className="mt-4 font-semibold">- Jane Doe, Host</p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "Sign up", icon: "📝" },
            { step: "List your place", icon: "🏡" },
            { step: "Start earning", icon: "💵" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.step}</h3>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto">
          {[
            { question: "How do I sign up?", answer: "You can sign up by clicking the 'Try Hosting' button." },
            { question: "What are the fees?", answer: "We charge a small commission on each booking." },
            { question: "Can I host part-time?", answer: "Yes, you have full control over your availability." },
            { question: "What support do you offer?", answer: "We provide 24/7 support to all our hosts." },
          ].map((faq, index) => (
            <details
              key={index}
              className="mb-4 border-b pb-4 cursor-pointer group"
            >
              <summary className="text-lg font-semibold text-blue-600 group-hover:text-blue-800">
                {faq.question}
              </summary>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Hosting?</h2>
        <button className="bg-gold-500 hover:bg-gold-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg">
          Try Hosting
        </button>
      </section>
    </div>
  );
};

export default BecomeAHost;
