import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/Dashboard.css';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [allUserProfiles, setAllUserProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedSkillUsers, setSelectedSkillUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserId = async () => {
    try {
      const user = await axios.get("/users/userfromtoken", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      setUserId(user.data.data._id);
    } catch (err) {
      setError("Error fetching user ID");
    }
  };

  const fetchAllSkills = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/skills");
      setAllSkills(response.data);
    } catch (err) {
      setError('Error fetching skills');
    }
  };

  const fetchAllUserProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:5001/userprofile/userprofiles");
      setAllUserProfiles(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching user profiles');
      setLoading(false);
    }
  };

  const handleSkillClick = (skillId) => {
    const usersWithSkill = allUserProfiles.filter(profile => 
      profile.skills.some(skill => skill._id === skillId)
    );
    setSelectedSkillUsers(usersWithSkill);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchUserId();
    fetchAllSkills();
    fetchAllUserProfiles();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/userprofile/userprofile/"+userId);
        setUserProfile(response.data);
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!userProfile) return <div className="no-profile">No user profile found</div>;

  return (
    <div className="dashboard-container">
      <div className="profile-section">
        <div className="profile-header">
          <h1>My Profile</h1>
        </div>
        <div className="profile-content">
          <div className="profile-skills">
            <h2>My Skills</h2>
            <div className="skills-grid">
              {userProfile.skills && userProfile.skills.length > 0 ? (
                userProfile.skills.map((skill, index) => (
                  <div key={index} className="skill-card">
                    {skill.skill_name || skill.name || 'Unnamed Skill'}
                  </div>
                ))
              ) : (
                <p>No skills listed</p>
              )}
            </div>
          </div>

          <div className="profile-interests">
            <h2>My Interests</h2>
            <div className="interests-grid">
              {userProfile.interests && userProfile.interests.length > 0 ? (
                userProfile.interests.map((interest, index) => (
                  <div key={index} className="interest-card">
                    {interest.interest_name || interest.name || 'Unnamed Interest'}
                  </div>
                ))
              ) : (
                <p>No interests listed</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="all-skills-section">
        <div className="all-skills-header">
          <h1>All Available Skills</h1>
        </div>
        <div className="skills-grid">
          {allSkills && allSkills.length > 0 ? (
            allSkills.map((skill) => (
              <div 
                key={skill._id} 
                className="skill-card"
                onClick={() => handleSkillClick(skill._id)}
              >
                {skill.skill_name}
              </div>
            ))
          ) : (
            <p>No skills available</p>
          )}
        </div>
      </div>

      {/* Modal for Users with Selected Skill */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Users with this Skill</h2>
              <button onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
            <div className="users-list">
              {selectedSkillUsers.length > 0 ? (
                selectedSkillUsers.map((profile) => (
                  <div key={profile._id} className="user-card">
                    <p>User ID: {profile.user_Id}</p>
                  </div>
                ))
              ) : (
                <p>No users found with this skill</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;