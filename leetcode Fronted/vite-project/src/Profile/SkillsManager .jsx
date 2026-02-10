// components/SkillsManager.jsx
import React, { useState } from 'react';
import { Plus, X, Tag, Search } from 'lucide-react';

const SkillsManager = ({ skills, onAddSkill, onRemoveSkill }) => {
  const [newSkill, setNewSkill] = useState('');
  const [suggestions, setSuggestions] = useState([
    'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript',
    'GraphQL', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL',
    'MongoDB', 'Redis', 'Next.js', 'Vue.js', 'Svelte',
    'Go', 'Rust', 'Java', 'C#', 'Swift'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuggestions = suggestions.filter(
    skill => !skills.includes(skill) && 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onAddSkill(newSkill.trim());
      setNewSkill('');
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const handleSuggestionClick = (skill) => {
    onAddSkill(skill);
    setSearchTerm('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Tag size={20} className="text-blue-500" />
          Skills & Expertise
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {skills.length} skills
        </span>
      </div>
      
      {/* Add Skill Input */}
      <div className="relative mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Add a skill..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={handleKeyPress}
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 
                           rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                {filteredSuggestions.map((skill, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                    onMouseDown={() => handleSuggestionClick(skill)}
                  >
                    <span className="text-gray-700">{skill}</span>
                    <Plus size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={handleAddSkill}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg 
                     font-medium flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          Press Enter or click Add to add a new skill
        </p>
      </div>
      
      {/* Skills Grid */}
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-r from-blue-50 to-indigo-50 
                     border border-blue-100 rounded-lg px-4 py-3 flex items-center gap-2"
          >
            <Tag size={16} className="text-blue-500" />
            <span className="font-medium text-gray-800">{skill}</span>
            <button
              onClick={() => onRemoveSkill(skill)}
              className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 
                       transition-opacity p-1 hover:bg-red-50 rounded"
            >
              <X size={16} />
            </button>
            
            {/* Proficiency Indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100 rounded-b-lg overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-indigo-400"
                style={{ width: `${70 + (index * 5) % 30}%` }}
              ></div>
            </div>
          </div>
        ))}
        
        {skills.length === 0 && (
          <div className="text-center w-full py-8 text-gray-500">
            <Tag size={32} className="mx-auto mb-3 opacity-50" />
            <p>No skills added yet. Add your first skill above!</p>
          </div>
        )}
      </div>
      
      {/* Skill Stats */}
      {skills.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">{skills.length}</div>
              <div className="text-sm text-gray-600">Total Skills</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(skills.length * 4.2)}/100
              </div>
              <div className="text-sm text-gray-600">Profile Strength</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsManager;