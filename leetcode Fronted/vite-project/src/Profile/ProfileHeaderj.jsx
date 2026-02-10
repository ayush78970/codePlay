// components/ProfileHeader.jsx
import React, { useRef, useState } from 'react';
import { Camera, MapPin, Mail, Calendar, Edit2 } from 'lucide-react';

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-48 bg-gradient-to-r from-blue-50 to-indigo-50">
        {userData.coverPhoto ? (
          <img 
            src={userData.coverPhoto} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-50 to-indigo-50" />
        )}
        
        <button 
          onClick={handleCoverPhotoClick}
          className="absolute bottom-4 right-4 bg-white/90 hover:bg-white backdrop-blur-sm 
                   px-4 py-2 rounded-lg text-sm font-medium text-gray-700 
                   flex items-center gap-2 transition-all hover:shadow-sm"
        >
          <Camera size={16} />
          {userData.coverPhoto ? 'Change Cover' : 'Add Cover'}
        </button>
        
        <input 
          type="file" 
          ref={coverInputRef} 
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'cover')}
        />
      </div>
      
      {/* Profile Info */}
      <div className="px-8 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-xl border-4 border-white bg-gradient-to-br from-blue-100 to-indigo-100 
                         shadow-lg overflow-hidden">
              {userData.profilePic ? (
                <img 
                  src={userData.profilePic} 
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-blue-600">
                  {userData.name.charAt(0)}
                </div>
              )}
            </div>
            
            <button 
              onClick={handleProfilePicClick}
              disabled={isUploading}
              className="absolute -bottom-2 -right-2 bg-white hover:bg-gray-50 border border-gray-200 
                       w-10 h-10 rounded-full flex items-center justify-center shadow-md
                       transition-all hover:shadow-lg disabled:opacity-50"
            >
              {isUploading ? (
                <div className="relative">
                  <Camera size={18} className="text-gray-400" />
                  {uploadProgress > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                      {uploadProgress}%
                    </div>
                  )}
                </div>
              ) : (
                <Camera size={18} className="text-gray-600" />
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
          
          {/* Edit Button */}
          <div className="sm:ml-auto mt-4 sm:mt-0">
            <button 
              onClick={onEditClick}
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 
                       px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 
                       transition-all hover:border-gray-400 hover:shadow-sm"
            >
              <Edit2 size={16} />
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* User Details */}
        <div className="mt-6">
          <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
          <p className="text-gray-500 text-lg mt-1">{userData.username}</p>
          <p className="text-blue-600 font-medium mt-2">{userData.title}</p>
          
          <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl">{userData.bio}</p>
          
          <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{userData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{userData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Joined {userData.joinDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;