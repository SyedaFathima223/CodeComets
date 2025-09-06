import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useParams } from 'react-router-dom';
//import axios from 'axios';//

// Mock API service functions and data for demonstration purposes
const mockProjects = [
  { _id: 'proj1', name: 'Website Redesign', description: 'Re-imagine the main company website.' },
  { _id: 'proj2', name: 'Mobile App Development', description: 'Build a new cross-platform mobile app.' },
];
const mockTasks = {
  proj1: [{ _id: 'task1', title: 'Design wireframes', projectId: 'proj1' }, { _id: 'task2', title: 'Implement home page', projectId: 'proj1' }],
  proj2: [{ _id: 'task3', title: 'Plan user flows', projectId: 'proj2' }],
};

const mockApi = {
  getProjects: () => new Promise(resolve => setTimeout(() => resolve({ data: { projects: mockProjects } }), 500)),
  getProjectById: (id) => new Promise(resolve => setTimeout(() => resolve({ data: { project: mockProjects.find(p => p._id === id) } }), 500)),
  getTasksForProject: (id) => new Promise(resolve => setTimeout(() => resolve({ data: { tasks: mockTasks[id] || [] } }), 500)),
  createTask: (taskData) => new Promise(resolve => setTimeout(() => {
    const newTask = { _id: `task${Date.now()}`, title: taskData.title, projectId: taskData.projectId };
    if (!mockTasks[taskData.projectId]) {
      mockTasks[taskData.projectId] = [];
    }
    mockTasks[taskData.projectId].push(newTask);
    resolve({ data: { message: 'Task created successfully' } });
  }, 500)),
};

// Auth Context (All in one file)
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const login = (userData) => {
    setAuthState({
      user: userData.user,
      token: userData.token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  };

  const value = { authState, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Components (All in one file)
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = { data: { user: { email: 'user@example.com' }, token: 'mock-token-123' } }; // Mocked response
      login(response.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to SynergySphere</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Login
        </button>
        <p className="mt-6 text-center text-gray-600">
          Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Mocked API call for registration
      const response = { data: { message: 'Registration successful!' } };
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up for SynergySphere</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
          Sign Up
        </button>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

const DashboardPage = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await mockApi.getProjects();
      setProjects(response.data.projects);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchData();
    }
  }, [authState.isAuthenticated, fetchData]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!authState.isAuthenticated) {
    return (
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <p className="text-xl text-gray-700 mb-4">You must be logged in to view this page.</p>
        <Link to="/login" className="text-blue-600 font-semibold hover:underline">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">SynergySphere Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors">
          Logout
        </button>
      </div>
      <p className="text-xl text-gray-600 mb-4">Welcome, {authState.user.email}!</p>
      
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Projects</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <li key={project._id} className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <Link to={`/projects/${project._id}`} className="block">
                <h3 className="text-xl font-bold text-blue-600 hover:underline">{project.name}</h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { authState } = useAuth();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const projectResponse = await mockApi.getProjectById(projectId);
      const tasksResponse = await mockApi.getTasksForProject(projectId);
      if (!projectResponse.data.project) {
        navigate('/'); // Redirect if project not found
        return;
      }
      setProject(projectResponse.data.project);
      setTasks(tasksResponse.data.tasks || []);
    } catch (err) {
      setError('Failed to fetch project data.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [projectId, navigate]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchData();
    } else {
      navigate('/login');
    }
  }, [authState.isAuthenticated, fetchData, navigate]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await mockApi.createTask({ title: newTaskTitle, projectId: projectId });
      setNewTaskTitle('');
      fetchData();
    } catch (setError) {
      setError('Failed to create task.');
    }
  };

  if (isLoading) return <p className="text-gray-500">Loading project...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl mx-auto">
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Dashboard</Link>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{project?.name}</h2>
      <p className="text-gray-600 mb-6">{project?.description}</p>

      <form onSubmit={handleCreateTask} className="flex gap-4 mb-8">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New Task Title"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
          Add Task
        </button>
      </form>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Tasks</h3>
      <ul className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task._id} className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-sm">
              <span className="text-gray-700">{task.title}</span>
            </li>
          ))
        ) : (
          <p className="text-gray-500">This project has no tasks yet. Add one above!</p>
        )}
      </ul>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans p-4">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
