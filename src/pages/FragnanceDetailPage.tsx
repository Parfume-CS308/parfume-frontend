import React from 'react';
import { useParams } from 'react-router-dom';

const FragranceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Fetch the fragrance data based on ID (assuming you have a data source)
  const fragrance = {
    id,
    name: "Sample Fragrance",
    image: "/path/to/image.jpg", // replace with actual image path
    notes: {
      top: ["Lemon", "Orange Zest", "Bergamot"],
      heart: ["Rose", "Lavender", "Jasmine"],
      base: ["Cedarwood", "Vanilla", "Patchouli"],
    },
  };

  return (
    <div className="flex flex-col md:flex-row p-6 gap-8">
      {/* Left side: Perfume Image */}
      <div className="flex-1">
        <img src={fragrance.image} alt={fragrance.name} className="w-full h-auto rounded-lg shadow-md" />
      </div>

      {/* Right side: Fragrance Pyramid */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">{fragrance.name}</h2>
        <div className="fragrance-pyramid space-y-8">
          <div className="pyramid-section">
            <h3 className="text-xl font-semibold text-gray-700">Top Notes</h3>
            <ul className="list-disc list-inside text-gray-600">
              {fragrance.notes.top.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="pyramid-section">
            <h3 className="text-xl font-semibold text-gray-700">Heart Notes</h3>
            <ul className="list-disc list-inside text-gray-600">
              {fragrance.notes.heart.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
          <div className="pyramid-section">
            <h3 className="text-xl font-semibold text-gray-700">Base Notes</h3>
            <ul className="list-disc list-inside text-gray-600">
              {fragrance.notes.base.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragranceDetailPage;
