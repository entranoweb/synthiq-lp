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
    <div className="flex flex-col md:flex-row gap-10 mb-8"> {/* Added mb-6 for bottom spacing */}
      {serviceHighlights.map((highlight, index) => (
        <Card key={index} className="flex-1">
          <CardHeader>
            <CardTitle>{highlight.title}</CardTitle>
            <CardDescription>{highlight.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default ServiceHighlights;
