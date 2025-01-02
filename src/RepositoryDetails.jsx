import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './RepositoryDetails.css'; // Import CSS for styling

const RepositoryDetails = () => {
  const { username, repoName } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);
  const [userData, setUserData] = useState(null); // For user avatar
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/github/user/${username}`);
        setUserData(userResponse.data);

        const repoResponse = await axios.get(`http://localhost:5000/api/github/repository/${username}/${repoName}`);
        setRepoDetails(repoResponse.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRepoDetails();
  }, [username, repoName]);

  return (
    <div className="repository-details">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="repository-container">
          {/* Left Section: Repository Image and Verified Badge */}
          <div className="repository-left">
            <img className="repository-icon" src={userData?.avatar_url} alt={`${username}'s avatar`} />
            <div className="verified-badge">
              <span>✅ Verified by GitHub</span>
              <p>GitHub confirms that this app meets the requirements for verification.</p>
            </div>
            <div className="categories">
              <p><strong>Categories:</strong></p>
              <span className="category-badge">Code Review</span>
              <span className="category-badge">IDEs</span>
              <span className="category-badge">Free</span>
              <span className="category-badge">Paid</span>
            </div>
          </div>

          {/* Right Section: Repository Details */}
          <div className="repository-right">
            <h2>{repoDetails.name}</h2>
            <button className="cta-button">Set up a plan</button>
            <p><strong>Description:</strong> {repoDetails.description}</p>
            <p>
              <strong>Language:</strong> {repoDetails.language} | <strong>Forks:</strong> {repoDetails.forks} |{' '}
              <strong>Stars:</strong> {repoDetails.stargazers_count}
            </p>
            <p>
              <strong>Details:</strong> This repository helps with {repoDetails.description}. 
              Check the full project details to get started.
            </p>
            <Link to={`/repositories/${username}`} className="back-link">Back to Repositories</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepositoryDetails;
