import React from 'react';
import { FaRegCheckCircle } from "react-icons/fa"; // Replace 'fi' with any other set if you prefer

type TrustSectionProps = {
  trustElements: {
    certifications: string[];
    partnerships: string[];
    guarantees: string[];
  };
};

const TrustSection: React.FC<TrustSectionProps> = ({ trustElements }) => {
  return (
    <div className="container px-4 md:px-6 mx-auto mt-20">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        Why Choose Synthiq
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold mb-2 md:mb-4">Certifications</h3>
          <ul className="space-y-2">
            {trustElements.certifications.map((cert, index) => (
              <li key={index} className="flex items-center space-x-2">
                <FaRegCheckCircle className="h-5 w-5 text-blue-400" />
                <span>{cert}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold mb-2 md:mb-4">Partnerships</h3>
          <ul className="space-y-2">
            {trustElements.partnerships.map((partner, index) => (
              <li key={index} className="flex items-center space-x-2">
                <FaRegCheckCircle className="h-5 w-5 text-blue-400" />
                <span>{partner}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-xl font-bold mb-2 md:mb-4">Our Guarantees</h3>
          <ul className="space-y-2">
            {trustElements.guarantees.map((guarantee, index) => (
              <li key={index} className="flex items-center space-x-2">
                <FaRegCheckCircle className="h-5 w-5 text-blue-400" />
                <span>{guarantee}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
