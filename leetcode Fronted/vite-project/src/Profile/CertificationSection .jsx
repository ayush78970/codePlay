// components/CertificationSection.jsx
import React from 'react';
import { Award, ExternalLink, ChevronRight } from 'lucide-react';

const CertificationSection = ({ certifications }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Award size={20} className="text-yellow-500" />
          Certifications
        </h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium 
                         flex items-center gap-1 transition-colors">
          View All
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certifications.map(cert => (
          <div 
            key={cert.id} 
            className="group border border-gray-200 hover:border-blue-200 rounded-xl p-4 
                     hover:shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white 
                           font-bold text-lg shadow-sm"
                  style={{ backgroundColor: cert.color }}
                >
                  {cert.badge}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 
                               transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{cert.issuer}</p>
                  <p className="text-xs text-gray-400 mt-2">Issued {cert.date}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-blue-500 p-2">
                <ExternalLink size={18} />
              </button>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Verified</span>
                </div>
                <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                  Score: 98%
                </span>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Credential
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">4</span> of 8 certifications completed
          </div>
          <div className="w-48">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-blue-400 w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificationSection;