"use client"
import * as React from 'react';
import { useState } from 'react';
import { Card, CardContent } from './card';

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={`flex h-12 w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-base text-white shadow-sm ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`text-sm font-semibold text-gray-300 ${className}`}
      {...props}
    />
  )
);
Label.displayName = "Label";

const ROICalculator: React.FC = () => {
    const [rooms, setRooms] = useState<number>(100);
    const [staffCost, setStaffCost] = useState<number>(2000);
    const [monthlyInquiries, setMonthlyInquiries] = useState<number>(500);
    const [responseTime, setResponseTime] = useState<number>(5);
  
    const costSavings = Math.round(rooms * staffCost * 0.4);
    const efficiencyImprovement = Math.min(100, Math.round(50 - responseTime * 0.8));
    const satisfactionIncrease = Math.min(100, Math.round(monthlyInquiries * 0.07));
  
    return (
      <div className="text-center my-12">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Calculate Your ROI</h1> {/* New heading */}
        <Card className="max-w-lg mx-auto rounded-lg bg-black border border-gray-700 shadow-[0_4px_15px_#1662D4] mb-8 mt-8">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-xl font-semibold text-white text-center mb-4">ROI Calculator</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Input
                  id="rooms"
                  type="number"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                  className="bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="staffCost">Current Desk Staff Cost (£)</Label>
                <Input
                  id="staffCost"
                  type="number"
                  value={staffCost}
                  onChange={(e) => setStaffCost(Number(e.target.value))}
                  className="bg-gray-800"
                />
              </div>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="monthlyInquiries">Average Monthly Inquiries</Label>
                <Input
                  id="monthlyInquiries"
                  type="number"
                  value={monthlyInquiries}
                  onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                  className="bg-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responseTime">Response Time (minutes)</Label>
                <Input
                  id="responseTime"
                  type="number"
                  value={responseTime}
                  onChange={(e) => setResponseTime(Number(e.target.value))}
                  className="bg-gray-800"
                />
              </div>
            </div>
  
            <div className="space-y-4 pt-6 bg-black p-4 rounded-lg shadow-inner">
              <p className="text-gray-300">
                <strong>Projected Annual Cost Savings:</strong> <span className="text-white">£{costSavings.toLocaleString()}</span>
              </p>
              <p className="text-gray-300">
                <strong>Efficiency Improvement:</strong> <span className="text-white">{efficiencyImprovement}%</span>
              </p>
              <p className="text-gray-300">
                <strong>Guest Satisfaction Increase:</strong> <span className="text-white">{satisfactionIncrease}%</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default ROICalculator;
  