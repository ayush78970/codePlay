// components/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import ProfileHeader from './ProfileHeader ';
import ProfileStats from './ProfileStats';
import CertificationSection from './CertificationSection ';
import ActivityFeed from './ActivityFeed';
import ProfileEditor from './ProfileEditor';
import SkillsManager from './SkillsManager ';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  // Initial user data structure
  const [userData, setUserData] = useState({
    id: 1,
    name: user?.firstName || "User",
    username: user?.username || "@user",
    title: "Full Stack Developer",
    bio: "Passionate about coding and problem solving. Enjoys learning new technologies and building projects.",
    location: "San Francisco, CA",
    email: user?.emailId || "user@example.com",
    joinDate: "January 2023",
    profilePic: null,
    coverPhoto: null,
    company: "TechCorp Inc.",
    position: "Senior Developer",
    followers: 154,
    connections: 342,
    website: "https://alexjohnson.dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    twitter: "https://twitter.com/alexj",
    github: "https://github.com/alexj",
    stats: {
      problemsSolved: 247,
      certifications: 8,
      streak: 42,
      ranking: 156,
      submissions: 512
    },
    skills: ["JavaScript", "Python", "React", "Node.js", "MongoDB", "GraphQL", "TypeScript", "AWS"],
    certifications: [
      {
        id: 1,
        title: "JavaScript Advanced Concepts",
        issuer: "CodePlay",
        date: "Dec 2023",
        badge: "JS",
        color: "#f0db4f"
      },
      {
        id: 2,
        title: "React & Redux Mastery",
        issuer: "CodePlay",
        date: "Nov 2023",
        badge: "R",
        color: "#61dafb"
      },
      {
        id: 3,
        title: "Node.js Backend Development",
        issuer: "CodePlay",
        date: "Oct 2023",
        badge: "N",
        color: "#68a063"
      },
      {
        id: 4,
        title: "Python for Data Science",
        issuer: "CodePlay",
        date: "Sep 2023",
        badge: "P",
        color: "#3572A5"
      }
    ],
    recentActivity: [
      {
        id: 1,
        type: "code_submission",
        title: "Solved: Array Rotation Problem",
        details: "Optimal solution using O(n) time complexity",
        time: "2 hours ago",
        language: "JavaScript",
        points: 50
      },
      {
        id: 2,
        type: "certification_earned",
        title: "Earned: React & Redux Mastery Certification",
        details: "Scored 98% on final assessment",
        time: "1 day ago",
        badge: "R",
        color: "#61dafb"
      },
      {
        id: 3,
        type: "course_completed",
        title: "Completed: Advanced Algorithms Course",
        details: "Finished all 12 modules with perfect score",
        time: "3 days ago",
        language: "Python"
      },
      {
        id: 4,
        type: "code_submission",
        title: "Solved: Dynamic Programming Challenge",
        details: "Optimized solution from O(2^n) to O(n)",
        time: "1 week ago",
        language: "Python",
        points: 75
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update user data when Redux user changes
  useEffect(() => {
    if (user) {
      setUserData(prevData => ({
        ...prevData,
        name: user.firstName || prevData.name,
        email: user.emailId || prevData.email,
        username: user.username || prevData.username
      }));
    }
  }, [user]);

  // Simulate loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleProfileUpdate = (updatedData) => {
    setUserData({...userData, ...updatedData});
    setIsEditing(false);
  };

  const handleProfilePicChange = (picUrl) => {
    setUserData({...userData, profilePic: picUrl});
  };

  const handleCoverPhotoChange = (coverUrl) => {
    setUserData({...userData, coverPhoto: coverUrl});
  };

  const handleAddSkill = (skill) => {
    if (!userData.skills.includes(skill)) {
      setUserData({
        ...userData,
        skills: [...userData.skills, skill]
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setUserData({
      ...userData,
      skills: userData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ProfileHeader 
        userData={userData} 
        onEditClick={() => setIsEditing(true)}
        onProfilePicChange={handleProfilePicChange}
        onCoverPhotoChange={handleCoverPhotoChange}
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          <ProfileStats stats={userData.stats} />
          
          <SkillsManager 
            skills={userData.skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        </div>
        
        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <CertificationSection certifications={userData.certifications} />
          <ActivityFeed activities={userData.recentActivity} />
        </div>
      </div>
      
      {isEditing && (
        <ProfileEditor 
          userData={userData}
          onSave={handleProfileUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default Profile;