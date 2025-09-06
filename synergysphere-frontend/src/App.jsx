import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectDetailPage from './pages/ProjectDetailPage'; // <-- Import the new page

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/project/:projectId" element={<ProtectedRoute><ProjectDetailPage /></ProtectedRoute>} /> {/* <-- Add this new route */}
    </Routes>
  );
}

export default App;