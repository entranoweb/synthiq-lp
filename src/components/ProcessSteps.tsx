import React from 'react';
import { Card, CardContent } from './card'; // Adjust the import path based on your file structure

type ProcessStep = {
  step: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

interface ProcessStepsProps {
  steps: ProcessStep[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <div className="mt-12"> {/* Added margin-top here */}
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="bg-blue-950/50 border-blue-900">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
                {step.step}
              </div>
              <step.icon className="h-12 w-12 text-blue-400" />
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
