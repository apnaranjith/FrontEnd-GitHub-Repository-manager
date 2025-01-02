import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import UserRepositories from './UserRepositories';
import RepositoryDetails from './RepositoryDetails';
import FollowersPage from './FollowersPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repositories/:username" element={<UserRepositories />} />
          <Route path="/repository/:username/:repoName" element={<RepositoryDetails />} />
          <Route path="/followers/:username" element={<FollowersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
