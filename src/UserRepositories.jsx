import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './UserRepositories.css'; // Import CSS for styling

const UserRepositories = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/github/user/${username}`);
        setUserData(userResponse.data);
        const reposResponse = await axios.get(`http://localhost:5000/api/github/repositories/${username}`);
        setRepos(reposResponse.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="user-repositories">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="user-info">
            {userData && (
              <div className="user-profile">
                <img className="avatar" src={userData.avatar_url} alt={`${username}'s avatar`} />
                <div className="user-details">
                  <h2>{userData.name}</h2>
                  <p>{userData.bio}</p>
                  <p>
                    <strong>Location:</strong> {userData.location}
                  </p>
                  <p>
                    <strong>Blog:</strong> <a href={userData.blog}>{userData.blog}</a>
                  </p>
                  <Link to={`/followers/${username}`} className="view-followers">
                    View Followers
                  </Link>
                </div>
              </div>
            )}
          </div>

          <h3 className="repositories-title" style={{color:"white"}}>Repositories</h3>
          <div className="repositories-grid">
            {repos.map((repo) => (
              <div className="repository-card" key={repo.name}>
                <img className="repo-image" src={userData?.avatar_url} alt={`${repo.name} avatar`} />
                <h4 style={{color:"black"}}>{repo.name}</h4>
                <p>{repo.description}</p>
                <Link to={`/repository/${username}/${repo.name}`} className="repository-link">
                  View Repository
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRepositories;
