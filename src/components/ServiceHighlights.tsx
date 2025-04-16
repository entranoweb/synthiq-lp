import * as React from 'react';
import { Card, CardHeader, CardDescription, CardTitle } from './card';

const ServiceHighlights: React.FC = () => {
  const serviceHighlights = [
    {
      title: "Customized Voice AI",
      description: "Tailored to your hotel's unique requirements and brand voice"
    },
    {
      title: "Seamless Integration",
      description: "Works with your existing property management system"
    },
    {
      title: "Dedicated Support",
      description: "24/7 technical assistance and regular optimization"
    },
    {
      title: "Scalable Solution",
      description: "Grows with your business needs"
    }
  ];

  return (
    <section id="features" className="py-12 bg-black"> {/* Added a section for spacing and background */}
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-center mb-16">
          Tailored AI solutions for your hotel.
        </h2>
        <div className="flex flex-col md:flex-row gap-10">
          {serviceHighlights.map((highlight, index) => (
            <Card key={index} className="flex-1">
              <CardHeader>
                <CardTitle>{highlight.title}</CardTitle>
                <CardDescription>{highlight.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlights;
