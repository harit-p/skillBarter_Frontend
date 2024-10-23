import React, { useState, useEffect } from 'react';
import '../assets/InterestForm.css'; 
import { useNavigate } from 'react-router-dom'; 

const InterestForm = () => {  
  const [interests, setInterests] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState({});
  const navigate = useNavigate();

  // Fetch interests from the server
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch('http://localhost:5001/interest/interest');
        if (!response.ok) {
          throw new Error('Failed to fetch interests');
        }
  
        const data = await response.json();
        setInterests(data);

        // Initialize selectedInterests with false for all interest IDs
        const initialSelection = {};
        data.forEach(interest => {
          initialSelection[interest._id] = false; 
        });
        setSelectedInterests(initialSelection);
      } catch (error) {
        console.error('Error fetching interests:', error);
      }
    };
  
    fetchInterests();
  }, []);

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedInterests((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error('Error: userId is undefined');
      return;
    }

    const selectedInterestIds = Object.keys(selectedInterests).filter(interestId => selectedInterests[interestId]);

    // Prepare user profile data
    const userProfileData = {
      user_Id: userId,
      interests: selectedInterestIds,
    };

    try {
      const response = await fetch('http://localhost:5001/userprofile/userprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });

      if (response.ok) {
        // Mark user as having visited the interests form
        localStorage.setItem('visited', 'true');
        alert('Your interests have been saved!');
        navigate('/skillform');
      } else {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData.message);
      }
    } catch (error) {
      console.error('Error saving interests:', error);
    }
  };

  // Render loading state if interests are not yet fetched
  if (!interests.length) {
    return <div>Loading interests...</div>;
  }

  return (
    <div className="interest-form-container">
      <h2>Choose your interests</h2>
      <form onSubmit={handleSubmit}>
        {interests.map((interest) => (
          <label key={interest._id}>
            <input
              type="checkbox"
              name={interest._id}
              checked={selectedInterests[interest._id] || false}
              onChange={handleChange}
            />
            {interest.interest_name}
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InterestForm;
