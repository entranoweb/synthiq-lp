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
    <div className="mt-12 px-4 sm:px-6 md:px-0"> {/* Added horizontal padding for mobile */}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-8 sm:mb-12">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((step, index) => (
          <Card
            key={index}
            className="bg-blue-950/50 border-blue-900 shadow-lg transition-transform transform hover:scale-105"
          >
            <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-600 flex items-center justify-center text-lg sm:text-2xl font-bold text-white">
                {step.step}
              </div>
              <step.icon className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" />
              <h3 className="text-lg sm:text-xl font-bold">{step.title}</h3>
              <p className="text-sm sm:text-base text-gray-400">
                {step.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProcessSteps;
