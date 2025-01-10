import React from "react";

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">About Us</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 leading-7 mb-4">
          Founded in 2020, Perfume Store began with a passion for delivering
          exquisite fragrances to discerning customers worldwide. Over the
          years, we have curated a diverse collection of perfumes that cater to
          various tastes and preferences, ensuring quality and authenticity in
          every product we offer.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-7">
          To be the leading global destination for discovering and celebrating
          the art of perfumery, inspiring confidence and joy through unique and
          memorable fragrances for every individual.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-7">
          To create a seamless shopping experience where everyone can find their
          signature scent, explore new aromas, and indulge in the luxurious
          world of perfumes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
        <ul className="list-disc list-inside text-gray-700 leading-7">
          <li>
            Quality: We offer only the finest fragrances sourced from reputable
            manufacturers.
          </li>
          <li>
            Customer Satisfaction: Your happiness is our priority; we strive to
            exceed your expectations.
          </li>
          <li>
            Integrity: We conduct our business with honesty and transparency.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
        <p className="text-gray-700 leading-7 mb-4">
          Our dedicated team of fragrance experts is passionate about helping
          you find the perfect scent. From our knowledgeable customer service
          representatives to our skilled curators, we work together to ensure a
          delightful shopping experience.
        </p>
        {/* Add team member profiles here */}
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Testimonials</h2>
        <blockquote className="text-gray-700 italic border-l-4 border-blue-500 pl-4 mb-4">
          "Perfume Store has an amazing selection and their customer service is
          top-notch. I found my signature scent here and couldn't be happier!" –
          Jane D.
        </blockquote>
        {/* Add more testimonials here */}
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 leading-7">
          If you have any questions or feedback, feel free to reach out to us
          via email at{" "}
          <a href="mailto:support@perfume-store.com" className="text-blue-500">
            support@perfume-store.com
          </a>
          .
        </p>
      </section>

      <section className="text-center mt-12">
        <a
          href="/shop"
          className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-600"
        >
          Explore Our Collection
        </a>
      </section>
    </div>
  );
};

export default AboutUsPage;
