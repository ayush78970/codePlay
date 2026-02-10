// Alternative: Simplified LinkedIn-style Profile Picture Upload
const ProfileHeaderSimple = ({ userData, onProfilePicChange }) => {
  const fileInputRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleProfilePicClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onProfilePicChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start">
        {/* LinkedIn-style Profile Picture */}
        <div className="relative">
          <div 
            className="relative w-32 h-32 rounded-full border-4 border-white bg-gradient-to-br from-gray-200 to-gray-300 
                     shadow-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
            onClick={handleProfilePicClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {userData.profilePic ? (
              <img 
                src={userData.profilePic} 
                alt={userData.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            )}
            
            {/* Hover Overlay */}
            {isHovering && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-full">
                <div className="text-white text-center">
                  <Camera size={24} className="mx-auto mb-1" />
                  <span className="text-xs font-medium">Change photo</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Camera Icon Badge */}
          <div 
            className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 
                     shadow-md cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={handleProfilePicClick}
          >
            <Camera size={16} className="text-gray-700" />
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        
        {/* User Info */}
        <div className="ml-6 flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
          <p className="text-gray-700 mt-1">{userData.title}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {userData.location}
            </span>
            <span className="flex items-center gap-1">
              <Mail size={14} />
              Contact info
            </span>
            <span>{userData.connections || '0'} connections</span>
          </div>
        </div>
      </div>
    </div>
  );
};