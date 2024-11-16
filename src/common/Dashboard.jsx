import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ userId }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(/userprofile/userprofiles/${userId});
        setUserProfile(response.data);
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userProfile) {
    return <div>No user profile found.</div>;
  }

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div>
        <h2>Skills</h2>
        {userProfile.skills.length > 0 ? (
          <ul>
            {userProfile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills listed</p>
        )}
      </div>

      <div>
        <h2>Interests</h2>
        {userProfile.interests.length > 0 ? (
          <ul>
            {userProfile.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        ) : (
          <p>No interests listed</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;