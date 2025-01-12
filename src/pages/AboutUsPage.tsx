import React from "react";
import { Users, Star, Heart, Shield, Mail, MapPin, Phone } from "lucide-react";

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
      description: "Specializes in creating intuitive and responsive user interfaces"
    },
    {
      name: "Eren Altın",
      role: "Frontend Developer",
      description: "Expert in database design and server-side architecture"
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
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the story behind your favorite fragrance destination
          </p>
        </div>

        {/* Our Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Story</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
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
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-7">
              To be the leading global destination for discovering and celebrating
              the art of perfumery, inspiring confidence and joy through unique and
              memorable fragrances for every individual.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-7">
              To create a seamless shopping experience where everyone can find their
              signature scent, explore new aromas, and indulge in the luxurious
              world of perfumes.
            </p>
          </section>
        </div>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Quality</h3>
              <p className="text-gray-600">
                We offer only the finest fragrances sourced from reputable manufacturers.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Heart className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600">
                Your happiness is our priority; we strive to exceed your expectations.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="flex justify-center mb-4">
                <Shield className="w-12 h-12 text-blue-500" />
              </div>
              <h3 className="font-semibold mb-2">Integrity</h3>
              <p className="text-gray-600">
                We conduct our business with honesty and transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-semibold text-lg mb-2 text-blue-600">{member.name}</h3>
                <p className="text-gray-800 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center">Get in Touch</h2>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Mail className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <p className="font-semibold mb-2">Email Us</p>
                <a href="mailto:support@perfume-store.com" className="text-blue-500 hover:text-blue-600">
                  support@perfume-store.com
                </a>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <p className="font-semibold mb-2">Visit Us</p>
                <p className="text-gray-600">Sabancı University, Perfume City</p>
              </div>
              <div className="text-center">
                <Phone className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                <p className="font-semibold mb-2">Call Us</p>
                <p className="text-gray-600">+90 (507) 861 9609</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <a
            href="/shop"
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg"
          >
            Explore Our Collection
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;