import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/projects`;

// Function to get the auth token from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Service to fetch all projects for the logged-in user
export const getProjects = () => {
  return axios.get(API_URL, getAuthHeaders());
};

// Service to create a new project
export const createProject = (projectData) => {
  return axios.post(API_URL, projectData, getAuthHeaders());
};

// Add this new function to the bottom of the file
export const getProjectById = (projectId) => {
  return axios.get(`${API_URL}/${projectId}`, getAuthHeaders());
};
