import React from 'react';

interface FragranceNotesProps {
  top: string[];
  heart: string[];
  base: string[];
}

const FragranceNotes: React.FC<FragranceNotesProps> = ({ top, heart, base }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-8">Fragrance Notes</h2>
      
      <div className="space-y-8">
        {/* Top Notes */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-semibold">Top Notes</h3>
              <span className="text-sm text-gray-500">First Impression</span>
            </div>
          </div>
          <div className="ml-6 bg-blue-50 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {top.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Heart Notes */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <span className="inline-block w-2 h-2 bg-pink-400 rounded-full"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-semibold">Heart Notes</h3>
              <span className="text-sm text-gray-500">Heart of the Fragrance</span>
            </div>
          </div>
          <div className="ml-6 bg-pink-50 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {heart.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Base Notes */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-shrink-0">
              <span className="inline-block w-2 h-2 bg-amber-400 rounded-full"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-xl font-semibold">Base Notes</h3>
              <span className="text-sm text-gray-500">Long Lasting Impression</span>
            </div>
          </div>
          <div className="ml-6 bg-amber-50 rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              {base.map((note, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 shadow-sm"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FragranceNotes;