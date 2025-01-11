import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userprofile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setuserId] = useState(null);

  const fetchUserId = async () => {
    try {
      const user = await axios.get("/users/users", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token"),
        },
      });
      setuserId(user.data.userId);
    } catch (err) {
      setError("Error fetching user ID");
    }
  };

  useEffect(() => {
    fetchUserId();
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

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userprofile) {
    return <div>No user profile found.</div>;
  }

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <div>
        <h2>Skills</h2>
        {userprofile.skills && userprofile.skills.length > 0 ? (
          <ul>
            {userprofile.skills.map((skill, index) => (
              // Assuming skill is an object with the key `skill_name`
              <li key={index}>{skill.skill_name || "No skill name"}</li>
            ))}
          </ul>
        ) : (
          <p>No skills listed</p>
        )}
      </div>

      <div>
        <h2>Interests</h2>
        {userprofile.interests && userprofile.interests.length > 0 ? (
          <ul>
            {userprofile.interests.map((interest, index) => (
              // Assuming interest is an object with the key `interest_name`
              <li key={index}>{interest.interest_name || "No interest name"}</li>
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
