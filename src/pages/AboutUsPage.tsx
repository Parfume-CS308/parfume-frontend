import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      <p className="text-gray-700 leading-7 mb-4">
        Welcome to our perfume store! We are dedicated to providing the finest
        fragrances to our customers. Our mission is to bring you a collection of
        perfumes that suit every personality and style, ensuring quality and
        authenticity in every product we offer.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
      <p className="text-gray-700 leading-7">
        To be the leading global destination for discovering and celebrating the
        art of perfumery, inspiring confidence and joy through unique and
        memorable fragrances for every individual.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
      <p className="text-gray-700 leading-7">
        To create a seamless shopping experience where everyone can find their
        signature scent, explore new aromas, and indulge in the luxurious world
        of perfumes.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
      <p className="text-gray-700 leading-7">
        If you have any questions or feedback, feel free to reach out to us via
        email at{" "}
        <a href="mailto:support@perfume-store.com" className="text-blue-500">
          support@perfume-store.com
        </a>
        .
      </p>
    </div>
  );
};

export default AboutUsPage;
