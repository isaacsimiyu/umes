import axios from 'axios';

// Define the base API URL
const API_URL = 'http://localhost:5000';

/**
 * Fetch all available courses.
 * @returns {Promise<Object[]>} - List of courses.
 */
export const fetchCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error; // Re-throw error for further handling if needed
  }
};

/**
 * Apply for a course.
 * @param {string} courseId - ID of the course to apply for.
 * @param {string} studentId - ID of the student applying.
 * @returns {Promise<Object>} - Response from the server.
 */
export const applyForCourse = async (courseId, studentId) => {
  try {
    const response = await axios.post(`${API_URL}/api/applications`, {
      courseId,
      studentId,
    });
    return response.data;
  } catch (error) {
    console.error('Error applying for course:', error);
    throw error;
  }
};

/**
 * Add a new course.
 * @param {Object} course - The course object to add.
 * @returns {Promise<Object>} - The added course.
 */
export const addCourse = async (course) => {
  try {
    const response = await axios.post(`${API_URL}/api/courses`, course);
    return response.data;
  } catch (error) {
    console.error('Error adding course:', error);
    throw error;
  }
};

/**
 * Update cutoff score for a program.
 * @param {string} programId - The program ID.
 * @param {number} cutoff - The new cutoff value.
 * @returns {Promise<Object>} - Updated program data.
 */
export const updateCutoff = async (programId, cutoff) => {
  try {
    const response = await axios.put(`${API_URL}/api/courses/${programId}/cutoff`, {
      cutoff,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating cutoff:', error);
    throw error;
  }
};

/**
 * Generalized error handler for API calls (optional utility function).
 * @param {Function} apiCall - The API call function.
 * @returns {Promise<Object>} - The result of the API call or error message.
 */
export const handleApiCall = async (apiCall) => {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    console.error('API call failed:', error.response?.data || error.message);
    throw error;
  }
};
