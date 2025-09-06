import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/tasks`;

// Function to get the auth token from local storage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

// Service to fetch all tasks for a specific project
export const getTasksForProject = (projectId) => {
  return axios.get(API_URL, {
    params: { projectId }, // Pass projectId as a query parameter
    ...getAuthHeaders()
  });
};

// Service to create a new task
export const createTask = (taskData) => {
  return axios.post(API_URL, taskData, getAuthHeaders());
};