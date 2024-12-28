import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userprofile,setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setuserId] = useState()

  const fetchUserId = async()=>{
    const user= await axios.get("/users/protected",{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("token")
      }
    })
    console.log(user)
    setuserId(user.data.userId)
  }

  useEffect(() => {
    //const userId = localStorage.getItem("userId")
    fetchUserId()
    
   
    const fetchUserProfile = async () => {
      try {
        console.log(userId)
        const response = await axios.get(`/userprofileupdate/userprofileupdate/${userId}`);
        console.log(response)
        setUserProfile(response.data);
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };
  
    if(userId){

    fetchUserProfile();
    }
  },);

  if (loading) {
    return <div>Loading...</div>;
  }

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
        {userprofile.skills.length > 0 ? (
          <ul>
            {userprofile.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p>No skills listed</p>
        )}
      </div>

      <div>
        <h2>Interests</h2>
        {userprofile.interests.length > 0 ? (
          <ul>
            {userprofile.interests.map((interest, index) => (
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