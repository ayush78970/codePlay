// components/ActivityFeed.jsx
import React from 'react';
import { Code, Award, GraduationCap, Clock, TrendingUp, ChevronRight } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch(type) {
      case 'code_submission': return <Code size={20} />;
      case 'certification_earned': return <Award size={20} />;
      case 'course_completed': return <GraduationCap size={20} />;
      default: return <TrendingUp size={20} />;
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'code_submission': return 'bg-green-100 text-green-700';
      case 'certification_earned': return 'bg-yellow-100 text-yellow-700';
      case 'course_completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-purple-100 text-purple-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-500" />
          Recent Activity
        </h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium 
                         flex items-center gap-1 transition-colors">
          See All Activity
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map(activity => (
          <div 
            key={activity.id} 
            className="group p-4 border border-gray-100 hover:border-blue-100 
                     rounded-xl hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 
                                 transition-colors">
                      {activity.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {activity.points && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 text-sm 
                                     font-medium rounded-full">
                        +{activity.points} points
                      </span>
                    )}
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Clock size={14} />
                      {activity.time}
                    </span>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center gap-3">
                  {activity.language && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-sm 
                                   rounded-full font-medium">
                      {activity.language}
                    </span>
                  )}
                  
                  {activity.badge && (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded flex items-center justify-center 
                                 text-white text-xs font-bold"
                        style={{ backgroundColor: activity.color }}
                      >
                        {activity.badge}
                      </div>
                      <span className="text-sm text-gray-600">Certification</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Total Points Earned This Month</span>
          <span className="font-bold text-gray-900">425 points</span>
        </div>
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;