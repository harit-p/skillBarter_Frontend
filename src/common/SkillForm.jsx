import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/SkillForm.css';

const SkillForm = () => { // Removed the need for userId prop, it is fetched from localStorage
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/skills');
        const data = await response.json();
        setSkills(data);

        const initialSelection = {};
        data.forEach(skill => {
          initialSelection[skill._id] = false;
        });
        setSelectedSkills(initialSelection);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillChange = (event) => {
    const { name, checked } = event.target;
    setSelectedSkills((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Retrieve userId from localStorage
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      console.error('Error: userId is undefined');
      return;
    }

    const selectedSkillIds = Object.keys(selectedSkills).filter(skillId => selectedSkills[skillId]);

    const userProfileData = {
      user_Id: userId,
      skills: selectedSkillIds,
    };

    try {
      const response = await fetch(`http://localhost:5001/userprofile/userprofile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfileData),
      });

      if (response.ok) {
        alert('Your skills have been saved!');
        navigate('/dashboard'); // Replace with the correct route for the next page
      } else {
        const errorData = await response.json();
        console.error('Error updating profile:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="skill-form-container">
      <h2>Select Your Skills</h2>
      <form onSubmit={handleSubmit}>
        {skills.map((skill) => (
          <div key={skill._id} className="skill-item">
            <label>
              <input
                type="checkbox"
                name={skill._id}
                checked={selectedSkills[skill._id] || false}
                onChange={handleSkillChange}
              />
              {skill.skill_name}
            </label>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SkillForm;
