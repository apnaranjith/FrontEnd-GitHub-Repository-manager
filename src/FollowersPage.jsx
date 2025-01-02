import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const FollowersPage = () => {
  const { username } = useParams();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/github/followers/${username}`);
        setFollowers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [username]);

  return (
    <div>
      {loading ? <p>Loading...</p> : (
        <div>
          <h3>{username}'s Followers</h3>
          <ul>
            {followers.map((follower) => (
              <li key={follower.login}>
                <Link to={`/repositories/${follower.login}`}>{follower.login}</Link>
              </li>
            ))}
          </ul>
          <Link to={`/repositories/${username}`}>Back to Repositories</Link>
        </div>
      )}
    </div>
  );
};

export default FollowersPage;
