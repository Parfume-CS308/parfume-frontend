import React from "react";
import { Star, Heart, Shield, Mail, MapPin, Phone } from "lucide-react";

const AboutUsPage = () => {
  const teamMembers = [
    {
      name: "Batuhan Işıldak",
      role: "Full Stack Developer",
      description: "Lead developer focused on building robust and scalable solutions"
    },
    {
      name: "Deren Doğan",
      role: "Backend Developer",
      description: "Expert in database design and server-side architecture"
    },
    {
      name: "Eren Altın",
      role: "Frontend Developer",
      description: "Specializes in creating intuitive and responsive user interfaces"
    },
    {
      name: "Ataberk Çakır",
      role: "UI/UX Designer",
      description: "Creating beautiful and user-friendly design experiences"
    },
    {
      name: "Serra Bayraktar",
      role: "Product Manager",
      description: "Driving product strategy and customer satisfaction"
    },
    {
      name: "Ekmel Yavuz",
      role: "Quality Assurance Engineer",
      description: "Ensuring high-quality and reliable software delivery"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600" 
              aria-label="About Us">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the story behind your favorite fragrance destination
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-16" aria-labelledby="story-heading">
          <h2 id="story-heading" className="text-3xl font-semibold mb-6 text-center">Our Story</h2>
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <p className="text-gray-700 leading-7 mb-4">
              Founded in 2020, Perfume Store began with a passion for delivering
              exquisite fragrances to discerning customers worldwide. Over the
              years, we have curated a diverse collection of perfumes that cater to
              various tastes and preferences, ensuring quality and authenticity in
              every product we offer.
            </p>
          </div>
        </section>

        {/* Vision & Mission Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <section className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300" 
                   aria-labelledby="vision-heading">
            <h2 id="vision-heading" className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-7">
              To be the leading global destination for discovering and celebrating
              the art of perfumery, inspiring confidence and joy through unique and
              memorable fragrances for every individual.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300" 
                   aria-labelledby="mission-heading">
            <h2 id="mission-heading" className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-7">
              To create a seamless shopping experience where everyone can find their
              signature scent, explore new aromas, and indulge in the luxurious
              world of perfumes.
            </p>
          </section>
        </div>

        {/* Values Section */}
        <section className="mb-16" aria-labelledby="values-heading">
          <h2 id="values-heading" className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['Quality', 'Customer Satisfaction', 'Integrity'].map((value, index) => (
              <div key={value} 
                   className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
                <div className="flex justify-center mb-4">
                  {index === 0 && <Star className="w-12 h-12 text-blue-500" aria-hidden="true" />}
                  {index === 1 && <Heart className="w-12 h-12 text-blue-500" aria-hidden="true" />}
                  {index === 2 && <Shield className="w-12 h-12 text-blue-500" aria-hidden="true" />}
                </div>
                <h3 className="font-semibold mb-2">{value}</h3>
                <p className="text-gray-600">
                  {index === 0 && "We offer only the finest fragrances sourced from reputable manufacturers."}
                  {index === 1 && "Your happiness is our priority; we strive to exceed your expectations."}
                  {index === 2 && "We conduct our business with honesty and transparency."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16" aria-labelledby="team-heading">
          <h2 id="team-heading" className="text-3xl font-semibold mb-6 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} 
                   className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                   role="article"
                   aria-label={`Team member ${member.name}`}>
                <h3 className="font-semibold text-lg mb-2 text-blue-600">{member.name}</h3>
                <p className="text-gray-800 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16" aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-3xl font-semibold mb-6 text-center">Get in Touch</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" aria-hidden="true" />
                <p className="font-semibold mb-2">Email Us</p>
                <a href="mailto:support@perfume-store.com" 
                   className="text-blue-500 hover:text-blue-600 transition-colors">
                  support@perfume-store.com
                </a>
              </div>
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-4" aria-hidden="true" />
                <p className="font-semibold mb-2">Visit Us</p>
                <p className="text-gray-600">Sabancı University, Perfume City</p>
              </div>
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <Phone className="w-8 h-8 text-blue-500 mx-auto mb-4" aria-hidden="true" />
                <p className="font-semibold mb-2">Call Us</p>
                <p className="text-gray-600">+90 (507) 861 9609</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <a href="/shop"
             className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
             aria-label="Explore our collection">
            Explore Our Collection
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;