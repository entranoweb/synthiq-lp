"use client";

import { motion } from "framer-motion";

const metrics = [
  { label: "Average Response Time", value: "1.2s" },
  { label: "Languages Supported", value: "15+" },
  { label: "Accuracy Rate", value: "95%" },
  { label: "Staff Time Saved", value: "40%" },
];

export const MetricsTicker = () => {
  return (
    <div className="w-full bg-blue-950/50 py-8">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.01 }}
              whileHover={{ scale: 1.1 }} // Scaling up to 1.1 on hover
              className="text-center transform transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-blue-400">
                {metric.value}
              </div>
              <div className="text-sm text-gray-400">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
