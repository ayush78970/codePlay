// components/ProfileStats.jsx
import React from 'react';
import { CheckCircle, Trophy, Flame, TrendingUp, Code } from 'lucide-react';

const ProfileStats = ({ stats }) => {
  const statCards = [
    {
      label: "Problems Solved",
      value: stats.problemsSolved,
      icon: <CheckCircle className="text-green-500" size={24} />,
      color: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      label: "Certifications",
      value: stats.certifications,
      icon: <Trophy className="text-yellow-500" size={24} />,
      color: "bg-yellow-50",
      textColor: "text-yellow-700"
    },
    {
      label: "Day Streak",
      value: `${stats.streak} days`,
      icon: <Flame className="text-orange-500" size={24} />,
      color: "bg-orange-50",
      textColor: "text-orange-700"
    },
    {
      label: "Global Rank",
      value: `#${stats.ranking}`,
      icon: <TrendingUp className="text-blue-500" size={24} />,
      color: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      label: "Submissions",
      value: stats.submissions,
      icon: <Code className="text-purple-500" size={24} />,
      color: "bg-purple-50",
      textColor: "text-purple-700"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <Trophy size={20} className="text-blue-500" />
        CodePlay Stats
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.color} rounded-xl p-4 flex flex-col items-center justify-center 
                      transition-transform hover:scale-105 cursor-pointer`}
          >
            <div className="mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</div>
            <div className="text-sm text-gray-600 text-center mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Weekly Progress</span>
          <span className="font-medium text-green-600">+12%</span>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;