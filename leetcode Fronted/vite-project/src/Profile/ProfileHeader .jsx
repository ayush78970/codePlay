// components/ProfileHeader.jsx
import React, { useRef, useState } from 'react';
import { Camera, MapPin, Mail, Calendar, Edit2, User, Building, Link as LinkIcon } from 'lucide-react';

const ProfileHeader = ({ userData, onEditClick, onProfilePicChange, onCoverPhotoChange }) => {
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  
  const handleCoverPhotoClick = () => {
    coverInputRef.current.click();
  };

  const simulateUpload = (file, type) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Simulate successful upload
          setTimeout(() => {
            const reader = new FileReader();
            reader.onloadend = () => {
              if (type === 'profile') {
                onProfilePicChange(reader.result);
              } else {
                onCoverPhotoChange(reader.result);
              }
              setIsUploading(false);
              setUploadProgress(0);
            };
            reader.readAsDataURL(file);
          }, 300);
          
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    simulateUpload(file, type);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Cover Photo - LinkedIn Style */}
      <div className="relative h-48 bg-gradient-to-r from-gray-100 to-gray-200">
        {userData.coverPhoto ? (
          <img 
            src={userData.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200" />
        )}
        
        <button 
          onClick={handleCoverPhotoClick}
          className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 
                   px-4 py-2 rounded-full text-sm font-medium text-gray-700 
                   flex items-center gap-2 transition-all hover:shadow-md border border-gray-300"
        >
          <Camera size={16} />
          {userData.coverPhoto ? 'Update' : 'Add cover photo'}
        </button>
        
        <input 
          type="file" 
          ref={coverInputRef} 
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'cover')}
        />
      </div>
      
      {/* Profile Picture Section - LinkedIn Style */}
      <div className="px-8 pb-6">
        <div className="flex flex-col sm:flex-row items-start">
          {/* LinkedIn-style Circular Profile Picture with Overlay Upload Button */}
          <div className="relative -mt-16 sm:-mt-20 ml-4 sm:ml-0">
            <div className="relative group">
              {/* Profile Picture Container */}
              <div className="w-40 h-40 rounded-full border-4 border-white bg-gradient-to-br from-gray-200 to-gray-300 
                           shadow-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity"
                   onClick={handleProfilePicClick}>
                {userData.profilePic ? (
                  <img 
                    src={userData.profilePic} 
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={64} className="text-gray-400" />
                  </div>
                )}
                
                {/* LinkedIn-style Upload Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-200 flex items-center justify-center rounded-full">
                  <div className="text-white text-center p-4">
                    <Camera size={24} className="mx-auto mb-2" />
                    <span className="text-sm font-medium">Update photo</span>
                  </div>
                </div>
              </div>
              
              {/* Camera Button (Visible on hover) */}
              <button 
                onClick={handleProfilePicClick}
                disabled={isUploading}
                className="absolute bottom-2 right-2 bg-white hover:bg-gray-50 border border-gray-300 
                         w-10 h-10 rounded-full flex items-center justify-center shadow-lg
                         transition-all hover:shadow-xl group-hover:scale-110"
              >
                {isUploading ? (
                  <div className="relative">
                    <Camera size={18} className="text-gray-400 animate-pulse" />
                    {uploadProgress > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                        {uploadProgress}%
                      </div>
                    )}
                  </div>
                ) : (
                  <Camera size={18} className="text-gray-700" />
                )}
              </button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'profile')}
              />
            </div>
          </div>
          
          {/* User Info Section */}
          <div className="flex-1 mt-4 sm:mt-0 sm:ml-8">
            <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-700 text-lg mt-1">{userData.title}</p>
            <p className="text-gray-500 text-sm mt-1">{userData.location} • <span className="text-blue-600 cursor-pointer hover:underline">Contact info</span></p>
            <p className="text-gray-500 text-sm mt-1">{userData.followers || '0'} followers • {userData.connections || '0'} connections</p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full 
                               text-sm font-medium flex items-center gap-2 transition-colors">
                Open to
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 
                               px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 
                               transition-colors">
                Add profile section
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 
                               px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 
                               transition-colors">
                More
              </button>
            </div>
          </div>
          
          {/* LinkedIn-style Edit and Action Buttons */}
          <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onEditClick}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 
                       px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 
                       transition-colors"
            >
              <Edit2 size={16} />
              Edit profile
            </button>
          </div>
        </div>
        
        {/* LinkedIn-style Navigation */}
        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-6">
            <a href="#" className="py-3 border-b-2 border-blue-600 text-blue-600 font-medium">Posts</a>
            <a href="#" className="py-3 text-gray-500 hover:text-gray-700 font-medium">About</a>
            <a href="#" className="py-3 text-gray-500 hover:text-gray-700 font-medium">Articles</a>
            <a href="#" className="py-3 text-gray-500 hover:text-gray-700 font-medium">Media</a>
            <a href="#" className="py-3 text-gray-500 hover:text-gray-700 font-medium">Certifications</a>
            <a href="#" className="py-3 text-gray-500 hover:text-gray-700 font-medium">Activity</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;