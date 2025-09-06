import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getProjects, createProject } from '../services/projectService';

const DashboardPage = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await getProjects();
      // This is the corrected line to prevent crashes
      setProjects(response.data.projects || []);
    } catch (err) {
      setError('Failed to fetch projects.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    try {
      await createProject({ name: newProjectName });
      setNewProjectName('');
      fetchProjects();
    } catch (err) {
      setError('Failed to create project.');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', minWidth: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Dashboard</h2>
        <div>
          <span>Welcome, {authState.user?.email}!</span>
          <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Logout</button>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleCreateProject} style={{ marginBottom: '20px', display: 'flex' }}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="New Project Name"
          style={{ flexGrow: 1, padding: '8px', marginRight: '10px' }}
        />
        <button type="submit">Create Project</button>
      </form>
      <h3>Your Projects</h3>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {projects.length > 0 ? (
            projects.map(project => (
              <li key={project._id} style={{ padding: '10px', border: '1px solid #eee', marginBottom: '5px', borderRadius: '4px' }}>
                <Link to={`/project/${project._id}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                  {project.name}
                </Link>
              </li>
            ))
          ) : (
            <p>You don't have any projects yet. Create one above!</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;